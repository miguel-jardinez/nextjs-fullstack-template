import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@template/lib/auth";
import CreateNewPasswordView from "@template/modules/auth/create-new-password/ui/view/create-new-password-view";

const CreateNewPasswordPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.session.userId) {
    redirect("/dashboard");
  }

  return <CreateNewPasswordView />;
};

export default CreateNewPasswordPage;
