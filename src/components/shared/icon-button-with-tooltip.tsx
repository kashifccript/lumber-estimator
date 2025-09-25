'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

type IconButtonWithTooltipProps = {
  src: string;
  alt: string;
  tooltip: string;
  onClick?: () => void;
  disabled?: boolean;
  imageSize?: number; // default 20px
};

export function IconButtonWithTooltip({
  src,
  alt,
  tooltip,
  onClick,
  disabled = false,
  imageSize = 20
}: IconButtonWithTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Button
            onClick={onClick}
            variant='icon'
            size='icon'
            disabled={disabled}
          >
            <Image
              src={src}
              alt={alt}
              width={imageSize}
              height={imageSize}
              unoptimized
              quality={100}
            />
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
