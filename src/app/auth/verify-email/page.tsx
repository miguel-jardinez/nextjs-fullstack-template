import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@template/lib/auth";
import VerifyEmailView from "@template/modules/auth/verify-email/ui/views/verify-email-view";

const VerifyEmailPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.session.userId) {
    redirect("/dashboard");
  }

  return <VerifyEmailView />;
};

export default VerifyEmailPage;
