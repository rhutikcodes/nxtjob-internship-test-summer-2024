import React from 'react'
import Image from 'next/image'
import Avatar from './Avatar'

export default function MessageContainer() {
  return (
    <div>
        {/* message starting */}
<div className=' flex mb-[1rem] w-[816px] h-[138px] rounded-2xl border-[1px] border-gray-300 bg-[#ffffff] p-4 gap-3 '>
  {/* avatar bg-[#ff7d52]*/}
<Avatar w={40} h={40} bg="#ff7d52"/>
{/* mssg content */}
<div className="w-[740px] h-[114px] gap-6px">
{/* Name */}
<div className=' flex items-center w-[182[px] h-[24px] gap-4'>
  <p className='w-[45px] h-[24px] text-base font-medium size-[16px] text-[#7047eb] '>Name</p>
  <p className='text-xs font-light size-[12px] w-[121px] h-[16px] text-[#8a8aa3]'>11/16/21 8:14AM</p>
</div>
{/* mssg writeen long */}
<div className='w-[740px] h-[54px] gap-[10px]'>
  <p className='h-[54px] w-[740px] mt-1  font-inter font-normal text-sm leading-5 size-3.5 text-[#3f3f50]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
</div>
{/* likes save  */}
<div className='w-[740px] h-[24px] flex items-center  justify-between'>
{/* heart &chat */}
<div className='  w-[113px] h-[24px] gap-2'>
{/* heart */}
<div className='w-[54px] h-[24px] gap-1 mt-4'>
  <div className='flex items-center'>
  <div className='flex  w-[24px] h-[24px]'>
  <Image src={"/heart.svg"}  alt="like" height={12.5} width={14.5} />
  <p className='w-[26px] ml-2 h-[24px] text-sm leading-6 size-3.5 text-[#8a8aa3]'>20k</p>
<Image src={"chat.svg"} alt='chat' height={13} width={14.5} className='ml-5' />
<Image src={"/chat1.svg"} alt='chatpart' width={1.5} height={1.5} className='absolute left-[10.7rem] top-[28rem]' />
<Image src={"/chat1.svg"} alt='chatpart' width={1.5} height={1.5} className='absolute left-[10.9rem] top-[28rem]' />
<p className='w-[26px] ml-2 h-[24px] text-sm leading-6 size-3.5 text-[#8a8aa3]'>12k</p>
  </div>
  </div>
</div>

{/* chat */}
<div className='w-[51px] h-[24px] gap-1'>
<div className='w-[24px] h-[24px]'>
</div>
</div>
</div>

{/* bookmark */}
<div className='mt-8 flex items-center'>
  <Image src={"/ract.svg"} alt="bookmark" height={14.5} width={10.5}/>
  <p className='w-[10.5px] h-[14.5px] mr-9 ml-[3px] mb-[3px] text-sm text-[#8a8aa3]'>Save</p>
</div>
</div>
</div>
</div>
    </div>
  )
}
