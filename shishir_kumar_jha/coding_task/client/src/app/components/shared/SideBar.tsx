import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
export default function SideBar() {
  return (
    <main className="w-[280px] h-[1475px] border-r-[1px] border-gray-300 bg-[#FFFF]">
      {/* logo  header*/}
      <div className=" flex w-[280px] h-[64px] pt-[10px] pr-[24px] pb-[10px] pl-[24px] gap-2 bg-[#14003D]">
        {/* nextjob ai */}

        <div className=" w-[102.07px] h-[37px] text-[#FBFBFB]">
          {/* NextJob.ai */}

          <div className="w-[73.07px] h-[25.5px] flex  top-[21.36px] left-[24px] text-[#FBFBFB]">
            {/* nxt */}
            <p className="w-[34.63px] h-[16.83px] top-[23.37px] text-lg text-[#FBFBFB]">
              nxtj
            </p>
            <Image className="" src={"/o.svg"} alt="o" height={15} width={15} />
            <div className="w-[38.39px] h-[25.25px] top-[21.36px] left-[58.68px text-lg text-[#FBFBFB]">
              b.ai
              {/* <p className='w-[5.7px] h-[25.25px] top-[21.36px] left-[58.68px] text-[#FBFBFB]'>j</p>
              <p className='w-[13.82px] h-[18.32px] top-[22.09px] left-[83.24px] text-[#FBFBFB]'>b</p> */}
            </div>
          </div>
        </div>
        {/* community */}
        <p className="font-thin w-[76px] h-[20px] text-[#FFFFFF] text-sm leading-5 size-[14px] ">
          Community
        </p>
      </div>

      {/* pages */}
      <div className="w-[280px] h-[320px] p-3 gap-[6px]">
        {/* frame */}
        <div className="flex w-[256px] h-[36px] border-b-[1px] border-gray-300 pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[10px]">
          <Image width={14} height={14} alt="magnifing" src="/magnifying.svg" />
          <p className="w-[149px] h-[20px] text-[#8A8AA3] text-sm leading-5  size-[14px]">
            Browse Channels
          </p>
        </div>
        {/* tab */}
        <div className="w-[256px] h-[40px] rounded-lg pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] bg-[#FFFFFF]">
          {/* content */}
          <div className=" flex w-[232px] h-[24px] gap-[12px]">
            {/* box space */}
            <div className="flex w-[24px] h-[24px]">
              <Image
                className="top-[14.5px] left-[4.75px]  border-gray-700"
                width={14.5}
                height={14.5}
                src="/box.svg"
                alt="box"
              />
            </div>
            <p className="text-[14px] w-[196px] h-[20px] font-medium leading-[20px] tracking-tighter">
              Rules
            </p>
          </div>
        </div>
        {/* channel main*/}
        <div className="w-[256px] h-[208px] gap-1">
          {/* channel */}
          <div className=" flex w-[256px] h-[32px] pt-[6px] pr-2 pb-[6px] gap-[1px]">
            <Image
              src="/chevron-d.svg"
              alt="chevron-d"
              width={24}
              height={24}
            />
            {/* <Image   src="/mail.svg" alt="mail" width={6.5} height={3.5} className='top-[10.75px] left-[8.75px] border-[1.5px] border-gray-7000'/> */}
            {/* Frame 13 */}
            <div className="w-[125px] h-[20px]">
              <p className="w-[66px] h-[20px] font-inter leading-5 size-[12px] font-light text-700">
                CHANNELS
              </p>
            </div>
          </div>
          {/* tab */}
          <div className=" w-[256px] h-[40px] rounded-lg pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] bg-[#FFFFFF]">
            {/* content */}

            <div className=" flex w-[232px] h-[24px] gap-[12px] ">
              {/* box space */}

              <div className="flex w-[24px] h-[24px]">
                <Image
                  className=" top-[4.75px] left-[4.87px]   border-gray-700"
                  width={14.19}
                  height={14.5}
                  src="/user.svg"
                  alt="user"
                />
              </div>
              <p className="text-[14px] w-[196px] h-[20px] font-medium leading-[20px] tracking-tighter ">
                Introduction
              </p>
            </div>
          </div>
          {/* tab2 */}
          <div className="w-[256px] h-[40px] rounded-lg pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] bg-[#FFFFFF]">
            {/* content */}
            <div className=" flex w-[232px] h-[24px] gap-[12px]">
              {/* box space */}
              <div className="flex w-[24px] h-[24px]">
                <Image
                  className="top-[4.75px] left-[4.75px]   border-gray-700"
                  width={14.5}
                  height={14.5}
                  src="/speaker.svg"
                  alt="speaker"
                />
              </div>
              <p className="text-[14px] w-[166px] h-[20px] size-[12px] font-medium leading-[20px] tracking-tighter ">
                Anouncement
              </p>
              {/* Red dot */}
              <div className="w-[18px] h-[18px] rounded-3xl bg-red-500">
                <div className="w-[10px] h-[16px]  pl-1.5  pr-0.5   ">
                  <p className="absolute w-[6px] h-[16px] text-white text-xs leading-4">
                    1
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* tab3 */}
          <div className=" w-[256px] h-[40px] rounded-lg pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] bg-[#FFFFFF]">
            {/* content */}

            <div className=" flex w-[232px] h-[24px] gap-[12px] ">
              {/* box space */}
              <div className="flex w-[24px] h-[24px]">
                <Image
                  className=" top-[4.75px] left-[4.75px]   border-gray-700"
                  width={14.5}
                  height={14.5}
                  src="/success.svg"
                  alt="success"
                />
              </div>
              <p className="text-[14px] w-[196px] h-[20px] font-medium leading-[20px] tracking-tighter ">
                Sucess Stories
              </p>
            </div>
          </div>

          {/* tab4*/}
          <div className=" w-[256px] h-[40px] rounded-lg pt-[8px] pr-[12px] bg-[#E2DAFB]  pb-[8px] pl-[12px] gap-[8px] ">
            {/* content */}

            <div className=" flex  w-[232px] h-[24px] gap-[12px] ">
              {/* box space */}
              <div className="flex w-[24px] h-[24px]">
                <Image
                  className=" top-[4.75px] left-[4.75px]   border-gray-700"
                  width={14.5}
                  height={14.5}
                  src="/career.svg"
                  alt="success"
                />
              </div>
              <p className="text-[14px] w-[196px] h-[20px] font-medium leading-[20px] tracking-tighter text-[#7047EB]">
                Career Discussions
              </p>
            </div>
          </div>
        </div>
      </div>
      <UserButton />
    </main>
  );
}
