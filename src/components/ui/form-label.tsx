import React from "react";
import { Label } from "../shadcn-ui/label";

interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean;
}

export default function FormLabel({
  required,
  children,
  ...props
}: FormLabelProps) {
  return (
    <Label {...props}>
      {children}
      {required && <span className="text-red-600">&nbsp;*</span>}{" "}
    </Label>
  );
}
