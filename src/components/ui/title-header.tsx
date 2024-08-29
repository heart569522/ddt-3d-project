import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;
  type: "fixed" | "static";
  screen?: string;
  className?: string;
}

export default function TitleHeader({
  title,
  type,
  screen = "lg",
  className,
}: Props) {
  const renderHeader = () => {
    switch (type) {
      case "fixed":
        return (
          <div className={cn(className, `flex items-center relative lg:mb-8`)}>
            <div className={`static lg:fixed lg:mt-8`}>
              <h1 className="text-lg font-bold md:text-2xl uppercase">
                {title}
              </h1>
            </div>
          </div>
        );
      case "static":
      default:
        return (
          <div className={cn(className, `flex items-center relative`)}>
            <div className="static">
              <h1 className="text-lg font-bold md:text-2xl uppercase">
                {title}
              </h1>
            </div>
          </div>
        );
    }
  };

  return renderHeader();
}
