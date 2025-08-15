import * as React from "react";

import { cn } from "@template/lib/utils";
import { Button } from "./button";
import { IoLogoApple, IoLogoGithub, IoLogoGoogle } from "react-icons/io";
import { IconType } from "react-icons";

type SocialButtonProps = React.ComponentProps<"button"> & {
  provider: "google" | "github" | "apple";
};

type IconData = {
  Icon: IconType;
  label: string;
};

const iconProvider: Record<SocialButtonProps["provider"], IconData> = {
  google: {
    Icon: IoLogoGoogle,
    label: "Sign in with Google",
  },
  github: {
    Icon: IoLogoGithub,
    label: "Sign in with GitHub",
  },
  apple: {
    Icon: IoLogoApple,
    label: "Sign in with Apple",
  },
};

function SocialButton({ className, provider, ...props }: SocialButtonProps) {
  const Icon = iconProvider[provider].Icon;
  const label = iconProvider[provider].label;

  return (
    <Button
      variant="outline"
      className={cn(className, "flex items-center gap-2")}
      {...props}
    >
      <Icon />
      <span>{label}</span>
    </Button>
  );
}

export { SocialButton };
