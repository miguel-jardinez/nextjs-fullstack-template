import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@template/lib/auth";
import ForgetPasswordView from "@template/modules/auth/forget-password/ui/views/forget-password-view";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.session.userId) {
    redirect("/dashboard");
  }

  return <ForgetPasswordView />;
};

export default Page;
