import Image from "next/image";
import Link from "next/link";

import AuthCard from "@template/components/custom/default-card";

import ForgetPasswordForm from "../components/forget-password-form";

const ForgetPasswordView = () => (
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
      <ForgetPasswordForm />
      <Link href="/auth/callback">Confirm account</Link>
    </AuthCard>
  </>
);

export default ForgetPasswordView;
