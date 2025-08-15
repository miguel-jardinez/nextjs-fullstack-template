import Image from "next/image";

import AuthCard from "@template/components/custom/default-card";

import CreateNewPasswordForm from "../components/create-new-password-form";

const CreateNewPasswordView = () => (
  <>
    <AuthCard
      title="Create new password"
      description="Create a new password to get started"
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
      <CreateNewPasswordForm />
    </AuthCard>
  </>
);

export default CreateNewPasswordView;
