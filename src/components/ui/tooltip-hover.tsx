"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Props = {
  children: React.ReactNode;
  content: any;
  position?: "left" | "right" | "top" | "bottom";
  isUseMediaQuery?: boolean;
  mediaQuerySize? :string;
  positionMediaQuery?: "left" | "right" | "top" | "bottom";
};

export default function TooltipHover({
  children,
  content,
  position = "top",
  isUseMediaQuery = false,
  mediaQuerySize = "md",
  positionMediaQuery = "bottom",
}: Props) {
  const mediaQueryMatches = useMediaQuery(mediaQuerySize);
  const finalPosition = isUseMediaQuery && mediaQueryMatches ? positionMediaQuery : position;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="z-50"
          side={finalPosition}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
