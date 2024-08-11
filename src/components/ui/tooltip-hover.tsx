import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";

type Props = {
  children: React.ReactNode;
  content: any;
  position?: "left" | "right" | "top" | "bottom" | undefined;
};

export default function TooltipHover({ children, content, position = "top" }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="z-50" side={position}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
