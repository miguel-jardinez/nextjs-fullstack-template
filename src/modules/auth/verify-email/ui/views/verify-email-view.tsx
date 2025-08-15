import Image from "next/image";

import AuthCard from "@template/components/custom/default-card";

const VerifyEmailView = () => (
  <AuthCard
    title=""
    description=""
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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="text-sm text-gray-500">Please check your email for link.</p>
    </div>
  </AuthCard>
);

export default VerifyEmailView;
