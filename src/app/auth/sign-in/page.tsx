import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@template/lib/auth";
import SignInView from "@template/modules/auth/sign-in/ui/views/sign-in-view";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.session.userId) {
    redirect("/dashboard");
  }

  return <SignInView />;
};

export default Page;
