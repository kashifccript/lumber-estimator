'use client';

interface SegmentedProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function SegmentedProgress({
  value,
  size = 110,
  strokeWidth = 16,
  className = ''
}: SegmentedProgressProps) {
  const radius = (size - strokeWidth) / 2;

  const segments = [
    { size: 50, gap: 22 },
    { size: 30, gap: 22 },
    { size: 40, gap: 22 },
    { size: 25, gap: 22 },
    { size: 45, gap: 22 },
    { size: 35, gap: 22 }
  ];

  const totalSegmentDegrees = segments.reduce((sum, seg) => sum + seg.size, 0);
  const totalGapDegrees = segments.reduce((sum, seg) => sum + seg.gap, 0);
  const totalDegrees = totalSegmentDegrees + totalGapDegrees;

  const scaleFactor = 360 / totalDegrees;
  const scaledSegments = segments.map((seg) => ({
    size: seg.size * scaleFactor,
    gap: seg.gap * scaleFactor
  }));

  const progressDegrees = (value / 100) * totalSegmentDegrees * scaleFactor;

  const createSegmentPath = (segmentSize: number, startAngle: number) => {
    const endAngle = startAngle + segmentSize;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = size / 2 + radius * Math.cos(startAngleRad);
    const y1 = size / 2 + radius * Math.sin(startAngleRad);
    const x2 = size / 2 + radius * Math.cos(endAngleRad);
    const y2 = size / 2 + radius * Math.sin(endAngleRad);

    const largeArcFlag = segmentSize > 180 ? '1' : '0';

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  let currentAngle = -90; // Start from top
  let filledDegrees = 0;

  return (
    <div className="flex flex-row justify-between gap-4">
 <div className='flex items-center justify-center text-[48px] font-normal text-[#1F1F1F]'>
        {'Overview'}
      </div>
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >

      <svg width={size} height={size}>
        {scaledSegments.map((segment, index) => {
          const segmentStartAngle = currentAngle;
          const shouldFill = filledDegrees < progressDegrees;
          const remainingProgress = progressDegrees - filledDegrees;

          let segmentColor = '#FDBA8C'; // Default gray
          if (shouldFill) {
            if (remainingProgress >= segment.size) {
              segmentColor = '#E2624B'; // Orange for all filled segments
              filledDegrees += segment.size;
            } else if (remainingProgress > 0) {
              segmentColor = '#E2624B'; // Orange for partially filled segments
              filledDegrees += remainingProgress;
            }
          }

          const path = createSegmentPath(segment.size, segmentStartAngle);
          currentAngle += segment.size + segment.gap;

          return (
            <path
              key={index}
              d={path}
              stroke={segmentColor}
              strokeWidth={strokeWidth}
              strokeLinecap='round'
              fill='none'
            />
          );
        })}
      </svg>

      {/* Center text */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='text-center'>
          <span className='text-[36px] font-normal text-[#1F1F1F]'>
            {Math.round(value)}
          </span>
          <span className='text-[18px] text-[#1F1F1F]'>%</span>
        </div>
      </div>
    </div>
    </div>
  );
}
