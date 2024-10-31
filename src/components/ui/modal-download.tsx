"use client"
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn-ui/dialog";

interface Props {
  children: React.ReactNode;
}

export default function ModalDownload({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>PDF Download</DialogTitle>
          <DialogDescription>
            Click on the link below to download the PDF.
          </DialogDescription>
        </DialogHeader>
        file...
      </DialogContent>
    </Dialog>
  );
}
