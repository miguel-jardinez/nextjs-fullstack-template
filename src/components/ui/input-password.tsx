import * as React from "react";
import { IconType } from "react-icons";

import { cn } from "@template/lib/utils";
import { Input } from "./input";
import { useCallback, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type InputPasswordProps = Omit<React.ComponentProps<"input">, "type">;

function InputPassword({ className, ...props }: InputPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  return (
    <div className="relative">
      <Input
        {...props}
        type={isPasswordVisible ? "text" : "password"}
        className={cn(className, "pe-9")}
      />

      {/* Eye icon */}
      <button
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        aria-pressed={isPasswordVisible}
        aria-controls="password"
      >
        {isPasswordVisible ? (
          <EyeOffIcon
            size={16}
            aria-hidden="true"
          />
        ) : (
          <EyeIcon
            size={16}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}

export { InputPassword };
