import * as React from "react";

import { Button } from "@template/components/ui/button";

interface EmailTemplateProps {
  url: string;
}

export function ConfirmAccount({ url }: EmailTemplateProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <p className="text-sm text-gray-500">
        Please click the button below to confirm your account.
      </p>
      <Button asChild>
        <a
          target="_blank"
          href={url}
        >
          Confirm Account
        </a>
      </Button>
    </div>
  );
}
