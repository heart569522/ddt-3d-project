"use client";
import { CircleCheckBig, CircleOff, CircleAlert, X } from "lucide-react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/shadcn-ui/alert";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../shadcn-ui/alert-dialog";

export type AlertProps = {
  openModal: boolean;
  type: "success" | "warning" | "error";
  detail: string;
  onClose: () => void;
};

export function AlertModal({ openModal, type, detail, onClose }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AlertDialog open={openModal}>
      <AlertDialogContent className="flex flex-col justify-center items-center w-11/12 sm:w-[450px]">
        <AlertDialogHeader>
          {type === "success" ? (
            <AlertDialogTitle className="flex flex-col justify-center items-center text-center">
              <CircleCheckBig className="size-14"/>
              <span className="font-bold text-2xl">Success!</span>
            </AlertDialogTitle>
          ) : type === "warning" ? (
            <AlertDialogTitle className="flex flex-col justify-center items-center text-center">
              <CircleAlert className="size-14"/>
              <span className="font-bold text-2xl">Faild!</span>
            </AlertDialogTitle>
          ) : type === "error" ? (
            <AlertDialogTitle className="flex flex-col justify-center items-center text-center">
              <CircleOff className="size-14"/>
              <span className="font-bold text-2xl">Error!</span>
            </AlertDialogTitle>
          ) : (
            <></>
          )}
          <AlertDialogDescription className="text-lg">{detail}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction onClick={onClose}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
