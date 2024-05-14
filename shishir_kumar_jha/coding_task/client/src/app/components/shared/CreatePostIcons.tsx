import React from "react";
import Image from "next/image";
export default function CreatePostIcons({
  icon,
  width,
  height,
}: {
  icon: string;
  width: number;
  height: number;
}) {
  return (
    <div>
      <div className=" flex  mr-2 justify-center items-center w-[36px] h-[36px] rounded-full p-2 bg-gray-200">
        <Image src={`${icon}`} width={width} height={height} alt="Text" />
      </div>
    </div>
  );
}
