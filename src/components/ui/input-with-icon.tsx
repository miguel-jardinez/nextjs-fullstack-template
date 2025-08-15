import * as React from "react";
import { IconType } from "react-icons";

import { cn } from "@template/lib/utils";
import { Input } from "./input";

type InputWithIconProps = React.ComponentProps<"input"> & {
  IconLeading?: IconType;
  IconTrailing?: IconType;
  onClickIconLeading?: () => void;
  onClickIconTrailing?: () => void;
};

function InputWithIcon({
  className,
  type,
  IconLeading,
  IconTrailing,
  onClickIconLeading,
  onClickIconTrailing,
  ...props
}: InputWithIconProps) {
  return (
    <div className="relative">
      <Input
        {...props}
        className={cn(className, {
          "ps-9": IconLeading,
          "pe-9": IconTrailing,
        })}
      />

      {/* Left Icon */}
      {IconLeading && (
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <IconLeading size={16} />
        </div>
      )}

      {/* Right Icon */}
      {IconTrailing && (
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
          <IconTrailing size={16} />
        </div>
      )}
    </div>
  );
}

export { InputWithIcon };
