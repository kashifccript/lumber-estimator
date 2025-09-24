'use client';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

type IconButtonWithTooltipProps = {
  icon: React.ReactNode; 
  onClick?: () => void;
  tooltip: string;
  disabled?: boolean;
};

export function IconButtonWithTooltip({
  icon,
  onClick,
  tooltip,
  disabled = false
}: IconButtonWithTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button
              onClick={onClick}
              variant='icon'
              size='icon'
              disabled={disabled}
            >
              {icon}
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
