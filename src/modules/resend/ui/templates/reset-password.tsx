import * as React from "react";
import { Button } from "@template/components/ui/button";

interface EmailTemplateProps {
  url: string;
}

export function ResetPassword({ url }: EmailTemplateProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Don&apos;t worry!</h1>
      <p className="text-sm text-gray-500">
        Please click the button below to reset your password.
      </p>
      <Button asChild>
        <a
          target="_blank"
          href={url}
        >
          Reset Password
        </a>
      </Button>
    </div>
  );
}
