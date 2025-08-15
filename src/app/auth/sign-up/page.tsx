import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@template/lib/auth";
import SignupView from "@template/modules/auth/sign-up/ui/views/sign-up-view";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.session.userId) {
    redirect("/dashboard");
  }

  return <SignupView />;
};

export default Page;
