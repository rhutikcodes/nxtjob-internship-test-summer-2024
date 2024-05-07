import React from 'react';
import Image from 'next/image';

export default function NavBar() {
  return (
    <div>
      <nav className='bg-[#FFFFFF] w-[1195px] h-[64px]  border-b-[1px] border-gray-200 flex justify-between left-[280.01px] p-[12px]'>
        {/* career */}
        <div className='w-[182px] h-[24px] flex items-center gap-2'>
          {/* target */}
          <div className='flex items-center'>
            <Image width={14.5} height={14.5} className='border-gray-700 ' src={"/discussion.svg"} alt="career"/>
            <span className='ml-2'>Career Discussions</span>
          </div>
        </div>

        {/* header icons */}
        <div className='w-[360px] h-[32px] gap-4'>
{/* frame */}
<div className='flex '>
<div className='w-[240px] h-[32px] rounded-[0.25rem] pt-1 pr-2 pb-1 pl-2 bg-[#F7F7F8] flex justify-between'>
<p className='w-[40px] h-[24px] text-sm leading-6 size-[12px] text-[#8A8AA3] font-medium '>Search</p>
<div className='w-[16px] h-[16px]'>
    <Image src={"/search.svg"} alt='search' width={13.14} height={13.14} className='top-[1.33px] mt-1.5 left-[1.33px]'/>
</div>
</div>
{/* Bookmark */}
<div className=' flex w-[24px] h-[24px]'>
<Image src={"/rectangle.svg"} alt="bookmark" height={13.5} width={12} className='top-[1.33px]  ml-5 mt-2 left-[1.33px]'/>

<Image src={"/bell.svg"} alt="bookmark" height={14.5} width={14.5} className='top-[1.33px]  ml-5 mt-2 left-[1.33px]'/>
<Image src={"/help.svg"} alt="bookmark" height={20} width={20} className='top-[1.33px]  ml-5 mt-2 left-[1.33px]'/>
</div>
</div>

        </div>
      </nav>
    </div>
  );
}
