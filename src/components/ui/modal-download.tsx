"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn-ui/dialog";
import { configs } from "@/lib/configs";
import { Button } from "../shadcn-ui/button";
import { Download } from "lucide-react";

interface Props {
  children: React.ReactNode;
  floorId: string;
}

export default function ModalPDFDownload({ children, floorId }: Props) {
  const buildingId = floorId.substring(0, 5);

  const docs = configs.building[buildingId]?.floor?.[floorId]?.documents;
  // console.log("🚀 ~ ModalPDFDownload ~ docs:", docs);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>PDF Download</DialogTitle>
          <DialogDescription>
            Click on the link below to download the PDF.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {docs &&
            Object.entries(docs).map(([key, value]) => {
              if (
                typeof value === "object" &&
                value !== null &&
                "path" in value
              ) {
                // Single document with `name` and `path`
                return (
                  <div
                    className="flex justify-between items-center gap-2"
                    key={key}
                  >
                    <span className="text-base font-semibold">{value.name}</span>
                    <a
                      href={value.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </a>
                  </div>
                );
              } else if (typeof value === "object" && value !== null) {
                // Nested documents (e.g., sanitary_system)
                return Object.entries(value).map(([subKey, subValue]) => {
                  if (
                    typeof subValue === "object" &&
                    subValue !== null &&
                    "path" in subValue
                  ) {
                    return (
                      <div
                        className="flex justify-between items-center gap-2"
                        key={`${key}-${subKey}`}
                      >
                        <span className="text-base font-semibold">
                          {subValue.name}
                        </span>
                        <a
                          href={subValue.path}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </a>
                      </div>
                    );
                  }
                  return null;
                });
              }
              return null;
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
