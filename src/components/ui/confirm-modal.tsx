"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn-ui/alert-dialog";
import { Label } from "../shadcn-ui/label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  desc: string;
  type: "static" | "warning" | "danger";
  buttonText?: string;
  open: boolean;
  isVerify?: boolean;
  verifyText?: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function ConfirmModal({
  title,
  desc,
  type,
  buttonText = "ตกลง",
  open,
  isVerify = false,
  verifyText = "CONFIRM",
  onClose,
  onSubmit,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!open) {
      setInputValue("");
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const renderBody = () => {
    const isDisabled =
      isVerify && inputValue.toLowerCase() !== verifyText.toLowerCase();

    switch (type) {
      case "static":
        return (
          <>
            {isVerify && (
              <div className="flex items-center">
                <div className="grid flex-1 gap-3">
                  <Label htmlFor="verify" className="font-bold">
                    {`Please type "${verifyText.toUpperCase()}" to verify your action.`}
                  </Label>
                  <input
                    id="verify"
                    name="verify"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none px-3 py-2 text-sm"
                  />
                </div>
              </div>
            )}
            <AlertDialogDescription
              className={cn(isVerify ? "-translate-y-2" : "")}
            >
              {desc}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit} disabled={isDisabled}>
                {buttonText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        );

      case "warning":
        return (
          <>
            {isVerify && (
              <div className="flex items-center">
                <div className="grid flex-1 gap-3">
                  <Label htmlFor="verify" className="text-amber-600 font-bold">
                    {`Please type "${verifyText.toUpperCase()}" to verify your action.`}
                  </Label>
                  <input
                    id="verify"
                    name="verify"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none px-3 py-2 text-sm border-amber-500"
                  />
                </div>
              </div>
            )}
            <AlertDialogDescription
              className={cn(
                isVerify ? "-translate-y-2 text-amber-600" : "text-amber-600"
              )}
            >
              {desc}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-amber-600 hover:bg-amber-700"
                onClick={onSubmit}
                disabled={isDisabled}
              >
                {buttonText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        );

      case "danger":
        return (
          <>
            {isVerify && (
              <div className="flex items-center">
                <div className="grid flex-1 gap-3">
                  <Label htmlFor="verify" className="text-red-600 font-bold">
                    {`Please type "${verifyText.toUpperCase()}" to verify your action.`}
                  </Label>
                  <input
                    id="verify"
                    name="verify"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none px-3 py-2 text-sm border-red-500"
                  />
                </div>
              </div>
            )}
            <AlertDialogDescription
              className={cn(
                "text-lg font-semibold",
                isVerify ? "-translate-y-2" : ""
              )}
            >
              {desc}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={onSubmit}
                disabled={isDisabled}
              >
                {buttonText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        );
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        {renderBody()}
      </AlertDialogContent>
    </AlertDialog>
  );
}
