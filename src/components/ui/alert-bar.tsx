"use client";
import { CircleCheckBig, CircleOff, CircleAlert, X } from "lucide-react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/shadcn-ui/alert";
import { useEffect } from "react";

export type AlertProps = {
  type: "success" | "warning" | "error";
  detail: string;
  onClose: () => void;
};

export function AlertBar({ type, detail, onClose }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Alert className="fixed bottom-4 right-4 z-20 w-3/4 border border-zinc-500/50 bg-zinc-100/55 dark:border-white/20 dark:bg-zinc-800/60 sm:w-2/4 md:w-1/4">
      <div className="relative flex justify-end">
        <button
          type="button"
          className="absolute -translate-y-2 translate-x-2 rounded-md"
          onClick={onClose}
          aria-label="Close Alert"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {type === "success" ? (
        <>
          <CircleCheckBig className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
        </>
      ) : type === "warning" ? (
        <>
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
        </>
      ) : type === "error" ? (
        <>
          <CircleOff className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
        </>
      ) : (
        <></>
      )}
      <AlertDescription>{detail}</AlertDescription>
    </Alert>
  );
}
