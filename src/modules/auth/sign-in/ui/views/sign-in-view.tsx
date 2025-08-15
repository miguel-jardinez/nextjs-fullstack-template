import Image from "next/image";
import Link from "next/link";

import AuthCard from "@template/components/custom/default-card";

import SignInForm from "../components/sign-in-form";

const SignInView = () => (
  <>
    <AuthCard
      title="Sign up"
      description="Create an account to get started"
      logo={
        <Image
          src="/logo-light.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-full"
        />
      }
    >
      <SignInForm />
    </AuthCard>

    <p className="text-xs text-muted-foreground text-end mt-4">
      Don&apos;t have an account?{" "}
      <Link
        href="/auth/sign-up"
        className="text-primary/80 underline font-semibold"
      >
        Click here
      </Link>
    </p>
  </>
);

export default SignInView;
