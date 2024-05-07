import React from 'react';

export default function Avatar({ w, h, bg }: { w: number, h: number, bg: string }) {
  return (
    <div>
      <div className={`w-[${w}px] h-[${h}px] rounded-full bg-[${bg}] flex justify-center items-center`}>
        <p className='text-white'>P</p>
      </div>
    </div>
  );
}