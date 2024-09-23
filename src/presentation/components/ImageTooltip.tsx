import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ImageTooltipProps = {
    src : string,
    tooltip: string
    className?: string
}

export default function ImageTooltip({src, tooltip, className = ''}: ImageTooltipProps) {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className={cn(className)}>
        <img src={src} className="w-24 h-24 rounded-md object-cover"/>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}
