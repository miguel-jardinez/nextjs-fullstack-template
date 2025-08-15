import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import airbnb from "eslint-config-airbnb";
import prettierConfig from "eslint-config-prettier";
import a11yPlugin from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import pluginImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extends Next.js recommended configurations
  // https://nextjs.org/docs/app/building-your-application/configuring/eslint
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Disables all ESLint rules that might conflict with Prettier
  // https://github.com/prettier/eslint-config-prettier
  prettierConfig,
  {
    plugins: {
      // Modern ESLint styling rules (replaces eslint-plugin-prettier)
      // https://eslint.style/
      "@stylistic": stylistic,

      // Automatic import sorting and organization
      // https://github.com/lydell/eslint-plugin-simple-import-sort
      "simple-import-sort": pluginImportSort,

      // Automatic removal of unused imports and variables
      // https://github.com/sweepline/eslint-plugin-unused-imports
      "unused-imports": unusedImports,

      // Accessibility rules for JSX
      // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
      "jsx-a11y": a11yPlugin,

      // Prettier integration for ESLint
      // https://github.com/prettier/eslint-plugin-prettier
      prettier: prettier,

      // SonarJS for detecting bugs and code smells
      // https://github.com/SonarSource/eslint-plugin-sonarjs
      sonarjs: sonarjs,
    },
    rules: {
      ...airbnb.rules,
      ...a11yPlugin.flatConfigs.recommended.rules,
      // ========================================
      // SONARJS RULES - BUGS & CODE SMELLS
      // ========================================
      // Recommended SonarJS rules for detecting bugs and code smells
      // https://github.com/SonarSource/eslint-plugin-sonarjs#recommended-rules
      ...sonarjs.configs.recommended.rules,
      "sonarjs/void-use": "off",
      "sonarjs/todo-tag": "off",

      // ========================================
      // PRETTIER INTEGRATION
      // ========================================
      // Enforces Prettier formatting rules through ESLint
      // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
      "prettier/prettier": "error",

      // ========================================
      // UNUSED VARIABLES & IMPORTS - AUTO FIX
      // ========================================
      // Automatically removes unused imports when saving
      // https://github.com/sweepline/eslint-plugin-unused-imports#rules
      "unused-imports/no-unused-imports": "error",

      // Detects and reports unused variables (can be auto-fixed)
      // https://github.com/sweepline/eslint-plugin-unused-imports#no-unused-vars
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all", // Check all variables
          varsIgnorePattern: "^_", // Ignore variables starting with underscore
          args: "after-used", // Check args after the last used one
          argsIgnorePattern: "^_", // Ignore args starting with underscore
          ignoreRestSiblings: false, // Don't ignore rest siblings in destructuring
        },
      ],

      // ========================================
      // IMPORT SORTING & ORGANIZATION
      // ========================================
      // Automatically sorts imports in a consistent order
      // https://github.com/lydell/eslint-plugin-simple-import-sort#sorting
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. Side effect imports (imports that only have side effects)
            ["^\\u0000"],

            // 2. Built-in Node.js modules (node: prefix and core modules)
            [
              "^node:",
              `^(${[
                "assert",
                "buffer",
                "child_process",
                "cluster",
                "console",
                "constants",
                "crypto",
                "dgram",
                "dns",
                "domain",
                "events",
                "fs",
                "http",
                "https",
                "module",
                "net",
                "os",
                "path",
                "perf_hooks",
                "process",
                "punycode",
                "querystring",
                "readline",
                "repl",
                "stream",
                "string_decoder",
                "timers",
                "tls",
                "tty",
                "url",
                "util",
                "v8",
                "vm",
                "zlib",
              ].join("|")})(/|$)`,
            ],

            // 3. Third-party packages (React first, then other npm packages)
            ["^react", "^@?\\w"],

            // 4. Project aliases (customize this for your project)
            ["^@template(/.*|$)"],

            // 5. Relative imports (./ and ../)
            ["^\\."],
          ],
        },
      ],

      // Automatically sorts exports
      // https://github.com/lydell/eslint-plugin-simple-import-sort#sorting
      "simple-import-sort/exports": "error",

      // ========================================
      // CODE STYLING RULES
      // ========================================
      // Enforces maximum props per line in JSX
      // https://eslint.style/rules/jsx/jsx-max-props-per-line
      "@stylistic/jsx-max-props-per-line": ["error"],

      // Limits consecutive empty lines
      // https://eslint.style/rules/js/no-multiple-empty-lines
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],

      // Enforces arrow function body style
      // https://eslint.org/docs/latest/rules/arrow-body-style
      "arrow-body-style": ["error", "as-needed"],

      // Ensures files end with a newline
      // https://eslint.style/rules/js/eol-last
      "@stylistic/eol-last": ["error", "always"],

      // Enforces consistent indentation
      // https://eslint.style/rules/js/indent
      "@stylistic/indent": ["error", 2],

      // Warns about console statements (allows warn and error)
      // https://eslint.org/docs/latest/rules/no-console
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default defineConfig([
  ...eslintConfig,
  globalIgnores([".next", "src/components/ui"]),
]);
