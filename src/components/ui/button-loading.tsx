import React from "react";
import { Button } from "../shadcn-ui/button";
import { Loader2, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  isLoading: boolean;
  text: string;
  textLoading: string;
  className?: string;
  icon?: any;
}

export default function ButtonLoading({
  isLoading,
  text,
  textLoading,
  className,
  icon,
}: Props) {
  const Icon = icon;

  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      disabled={isLoading}
    >
      <span className="flex items-center justify-center gap-1">
        {isLoading ? (
          <>
            <p>{textLoading}</p>
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            <p>{text}</p>
            {icon && <Icon />}
          </>
        )}
      </span>
    </Button>
  );
}
