import AuthCard from "@template/components/custom/default-card";
import Image from "next/image";
import Link from "next/link";

import SignupForm from "../components/sign-up-form";

const SignupView = () => (
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
      <SignupForm />
    </AuthCard>

    <div className="flex flex-col gap-4 mt-4">
      <p className="text-xs text-muted-foreground">
        By signing up, you agree to our{" "}
        <Link
          href="/legals/privacy-policy"
          className="text-primary/80 underline font-semibold"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          href="/legals/terms-and-conditions"
          className="text-primary/80 underline font-semibold"
        >
          Terms and Conditions
        </Link>
        .
      </p>
    </div>
  </>
);

export default SignupView;
