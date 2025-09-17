'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface propsList {
  percentage: number;
}

export function CircleProgress({ percentage }: propsList) {
  return (
    <div className='flex w-full max-w-sm flex-row justify-between'>
      <div className='h-28 w-28'>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={12}
          styles={buildStyles({
            textColor: '#000',
            textSize: '20px',
            pathColor: '#E2624B', // orange
            trailColor: '#FDBA8C', // light orange
            strokeLinecap: 'round'
          })}
        />
      </div>
    </div>
  );
}
