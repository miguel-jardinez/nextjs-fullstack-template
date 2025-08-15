#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to validate kebab-case format
validate_kebab_case() {
    local module_name=$1
    if [[ ! $module_name =~ ^[a-z]+(-[a-z]+)*$ ]]; then
        return 1
    fi
    return 0
}

# Function to convert kebab-case to PascalCase
kebab_to_pascal() {
    local kebab=$1
    echo "$kebab" | awk '{gsub(/-[a-z]/, toupper(substr($0, index($0, "-")+1, 1))); gsub(/-/, ""); print toupper(substr($0,1,1)) substr($0,2)}'
}

# Function to convert kebab-case to camelCase
kebab_to_camel() {
    local kebab=$1
    echo "$kebab" | awk '{gsub(/-[a-z]/, toupper(substr($0, index($0, "-")+1, 1))); gsub(/-/, ""); print tolower(substr($0,1,1)) substr($0,2)}'
}

# Check if module name is provided
if [ $# -eq 0 ]; then
    print_status $RED "❌ Error: No module name provided"
    echo "Usage: $0 <module-name>"
    echo "Example: $0 account-planning"
    exit 1
fi

MODULE_NAME=$1
MODULE_NAME_PASCAL=$(kebab_to_pascal "$MODULE_NAME")
MODULE_NAME_CAMEL=$(kebab_to_camel "$MODULE_NAME")

# Validate kebab-case format
if ! validate_kebab_case "$MODULE_NAME"; then
    print_status $RED "❌ Error: Module name must be in kebab-case format"
    echo "Examples: account-planning, credit-card, debit-card"
    exit 1
fi

# Check if module already exists
if [ -d "src/modules/$MODULE_NAME" ]; then
    print_status $YELLOW "⚠️  Warning: Module '$MODULE_NAME' already exists"
    echo "Directory: src/modules/$MODULE_NAME"
    echo "Exiting to avoid overwriting existing files."
    exit 1
fi

print_status $BLUE "🚀 Creating module: $MODULE_NAME"

# Create directory structure
print_status $BLUE "📁 Creating directory structure..."

mkdir -p "src/modules/$MODULE_NAME/server"
mkdir -p "src/modules/$MODULE_NAME/ui/components"
mkdir -p "src/modules/$MODULE_NAME/ui/views"
mkdir -p "src/app/(application)/$MODULE_NAME"

print_status $GREEN "✅ Directory structure created"

# Create server procedure file
print_status $BLUE "📝 Creating server procedure file..."
cat > "src/modules/$MODULE_NAME/server/$MODULE_NAME-procedure.ts" << EOF
import { createTRPCRouter, protectedProcedure } from "@expenses/trcp/init";
import {
  createSchema,
  deleteSchema,
  getOneSchema,
  updateSchema,
} from "../schema";

export const ${MODULE_NAME_CAMEL}Procedure = createTRPCRouter({
  create: protectedProcedure
    .input(createSchema)
    .mutation(async ({ ctx, input }) => "Create $MODULE_NAME"),
  getMany: protectedProcedure.query(async ({ ctx }) => "Get many $MODULE_NAME"),
  getOne: protectedProcedure
    .input(getOneSchema)
    .query(async ({ ctx, input }) => "Get one $MODULE_NAME"),
  update: protectedProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }) => "Update $MODULE_NAME"),
  delete: protectedProcedure
    .input(deleteSchema)
    .mutation(async ({ ctx, input }) => "Delete $MODULE_NAME"),
});
EOF
print_status $GREEN "✅ Created: src/modules/$MODULE_NAME/server/$MODULE_NAME-procedure.ts"

# Create view file
print_status $BLUE "📝 Creating view file..."
cat > "src/modules/$MODULE_NAME/ui/views/$MODULE_NAME-view.tsx" << EOF
"use client";

const ${MODULE_NAME_PASCAL}View = () => (
  <div>
    <h1>${MODULE_NAME_PASCAL} View</h1>
  </div>
);

export default ${MODULE_NAME_PASCAL}View;
EOF
print_status $GREEN "✅ Created: src/modules/$MODULE_NAME/ui/views/$MODULE_NAME-view.tsx"

# Create types file
print_status $BLUE "📝 Creating types file..."
cat > "src/modules/$MODULE_NAME/types.ts" << EOF
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@expenses/trcp/routers/_app";

export type GetOne${MODULE_NAME_PASCAL}Type =
  inferRouterOutputs<AppRouter>["$MODULE_NAME_CAMEL"]["getOne"];

export type GetMany${MODULE_NAME_PASCAL}Type =
  inferRouterOutputs<AppRouter>["$MODULE_NAME_CAMEL"]["getMany"];
EOF
print_status $GREEN "✅ Created: src/modules/$MODULE_NAME/types.ts"

# Create schema file
print_status $BLUE "📝 Creating schema file..."
cat > "src/modules/$MODULE_NAME/schema.ts" << EOF
import { z } from "zod";

export const getOneSchema = z.object({
  id: z.string(),
});

export const createSchema = z.object({
  name: z.string(),
});

export const updateSchema = z
  .object({
    id: z.string(),
  })
  .extend(createSchema.shape);

export const deleteSchema = z.object({
  id: z.string(),
});

export type CreateSchema = z.infer<typeof createSchema>;
export type UpdateSchema = z.infer<typeof updateSchema>;
export type DeleteSchema = z.infer<typeof deleteSchema>;
export type GetOneSchema = z.infer<typeof getOneSchema>;
EOF
print_status $GREEN "✅ Created: src/modules/$MODULE_NAME/schema.ts"

# Create page file
print_status $BLUE "📝 Creating page file..."
cat > "src/app/(application)/$MODULE_NAME/page.tsx" << EOF
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@expenses/lib/auth";
import ${MODULE_NAME_PASCAL}View from "@expenses/modules/$MODULE_NAME/ui/views/$MODULE_NAME-view";
import { getQueryClient, trpc } from "@expenses/trcp/server";

const ${MODULE_NAME_PASCAL}Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.${MODULE_NAME_CAMEL}.getMany.queryOptions()
  );

  return <${MODULE_NAME_PASCAL}View />;
};

export default ${MODULE_NAME_PASCAL}Page;
EOF
print_status $GREEN "✅ Created: src/app/(application)/$MODULE_NAME/page.tsx"

print_status $GREEN "🎉 Module '$MODULE_NAME' created successfully!"

echo ""
print_status $BLUE "📋 Next steps:"
echo ""

print_status $YELLOW "1. Register the router in src/trcp/routers/_app.ts:"
echo ""
echo "import { ${MODULE_NAME_CAMEL}Procedure } from \"@expenses/modules/$MODULE_NAME/server/$MODULE_NAME-procedure\";"
echo ""
echo "export const appRouter = createTRPCRouter({"
echo "  // ...rest"
echo "  $MODULE_NAME: ${MODULE_NAME_CAMEL}Procedure,"
echo "});"
echo ""

print_status $YELLOW "2. Add the model to src/db/schema.ts:"
echo ""
echo "export const $MODULE_NAME_CAMEL = pgTable(\"$MODULE_NAME\", {"
echo "  id: text(\"id\")"
echo "    .primaryKey()"
echo "    .\$defaultFn(() => \"${MODULE_NAME}_\${nanoid()}\"),"
echo "  createdAt: timestamp(\"created_at\").\$defaultFn("
echo "    () => /* @__PURE__ */ new Date(),"
echo "  ),"
echo "  updatedAt: timestamp(\"updated_at\").\$defaultFn("
echo "    () => /* @__PURE__ */ new Date(),"
echo "  ),"
echo "});"
echo ""

# Function to add import and router to _app.ts
update_app_router() {
    local module_name=$1
    local module_name_camel=$2
    local module_name_camel_procedure=$3
    
    local app_file="src/trcp/routers/_app.ts"
    local temp_file=$(mktemp)
    
    # Add import after the existing imports (before the export line)
    awk -v import_line="import { ${module_name_camel_procedure} } from \"@expenses/modules/${module_name}/server/${module_name}-procedure\";" '
    /^export const appRouter/ { print import_line; print ""; print; next }
    { print }
    ' "$app_file" > "$temp_file"
    
    # Add router before the closing brace
    awk -v router_line="  ${module_name_camel}: ${module_name_camel_procedure}," '
    /^});/ { print router_line; print; next }
    { print }
    ' "$temp_file" > "$app_file"
    
    rm "$temp_file"
    print_status $GREEN "✅ Updated: $app_file"
}

# Function to add table to schema.ts
update_schema() {
    local module_name=$1
    local module_name_camel=$2
    
    local schema_file="src/db/schema.ts"
    
    # Add table at the end of the file
    cat >> "$schema_file" << EOF

export const ${module_name_camel} = pgTable("${module_name}", {
  id: text("id")
    .primaryKey()
    .\$defaultFn(() => "${module_name}_\${nanoid()}"),
  createdAt: timestamp("created_at").\$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").\$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});
EOF
    
    print_status $GREEN "✅ Updated: $schema_file"
}

# Update configuration files
print_status $BLUE "🔧 Updating configuration files..."

# Update _app.ts
update_app_router "$MODULE_NAME" "$MODULE_NAME_CAMEL" "${MODULE_NAME_CAMEL}Procedure"

# Update schema.ts
update_schema "$MODULE_NAME" "$MODULE_NAME_CAMEL"

print_status $GREEN "✅ Module creation complete!" 