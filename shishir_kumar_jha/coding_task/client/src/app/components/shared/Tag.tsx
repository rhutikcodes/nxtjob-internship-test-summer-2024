import React from "react";
import Image from "next/image";
export default function Tag({ tagname }: { tagname: string }) {
  return (
    <div>
      <div className=" flex   items-center  w-[92px] h-[28px] rounded-md py-1 px-2 bg-purple-50 mt-4">
        {/* tag image */}
        <div className="w-[16px] h-[16px]">
          <Image
            src={"taf.svg"}
            alt="tag"
            width={11}
            height={11}
            className=" mt-1 left-[3.7px] top-[3.7px]"
          />
          <Image
            src={"tagc.svg"}
            alt="tagcircle"
            width={0.69}
            height={0.69}
            className="absolute left-[2.98rem]  top-[17.05rem]"
          />
        </div>
        <p className="pl-[2px] w-[52px] h-[20px] size-[14px] text-[#7047eb] font-inter text-sm leading-5  font-normal">
          {tagname}
        </p>
      </div>
    </div>
  );
}
