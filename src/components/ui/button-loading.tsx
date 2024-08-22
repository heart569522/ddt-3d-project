import React from "react";
import { Button } from "../shadcn-ui/button";
import { Loader2, LogIn } from "lucide-react";

interface Props {
  isLoading: boolean;
  text: string;
  textLoading: string;
}

export default function ButtonLoading({ isLoading, text, textLoading }: Props) {
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      <span className="flex items-center justify-center gap-1">
        {isLoading ? (
          <>
            <p>{textLoading}</p>
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            <p>{text}</p>
            <LogIn />
          </>
        )}
      </span>
    </Button>
  );
}
