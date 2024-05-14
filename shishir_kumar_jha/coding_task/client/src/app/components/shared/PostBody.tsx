"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Tag from "./Tag";
import Avatar from "./Avatar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { PostComponent } from "@/features/userData/userDataSlice";
import axios from "axios";

export default function PostBody() {
  let showcreatePostComponent = useSelector(
    (state: RootState) => state.userInfo.showcreatePostComponent
  );

  const dispatch = useDispatch<AppDispatch>();

  //to show the createPost component or not
  const PostToogle = () => {
    dispatch(PostComponent());
  };

  return (
    <div>
      {showcreatePostComponent ? (
        <main className="blur-md bg-[#ffffff]  w-[880px] h-[1410px] top-[65px] absolute left-[430px] px-8 gap-6">
          {/* frame 1 */}

          <section className="w-[816px] h-[304px] border-b-[1px] pt-6 pb-4 gap-16">
            {/* Group intro */}
            <div className="w-[816px] h-[160px] border-b-[1px] gap-2">
              {/* avatar */}
              <div className="size-2xl  w-[64px] h-[64px] rounded-full bg-[#EBEBEF]">
                {/* circle */}
                <div className="h-[40px] w-[40px] top-[12px] left-[12px]">
                  <Image
                    className=" absolute top-[42.95px] left-[50.95px]"
                    width={24.17}
                    height={24.17}
                    src={"/cir.svg"}
                    alt="circle"
                  />
                  {/* Notification */}
                  {/* <div className='w-[40px] h-[40x] top-[12px] left-[12px] bg-red-500'>notification</div> */}
                  {/* STATUS */}
                  {/* <div className='w-[16px] h-[16px] top-[48px] left-[48px] embedid-full border-2px bg-green-400'></div> */}
                </div>
              </div>
              <p className="w-[816px] h-[32px] text-3xl mt-2 font-bold text-[#3F3F50] leading-8 size-[30px] ">
                Welcome to NxtJob
              </p>
              <p className="w-[816px] h-[48px] text-base mt-2 leading-6 font-normal size-[16px] text-[#8A8AA3]"></p>
            </div>
            {/* sub frame 4809... */}
            <div className="w-[816px] mt-3 h-[88px] gap-3">
              {/* input box */}
              <div className=" flex w-[816px] h-[48px] gap-5">
                {/* avatar */}
                <Avatar w={48} h={48} bg="#2dca72" />
                {/* <CreatePost/> */}

                {/* actual input */}
                <input
                  onClick={PostToogle}
                  placeholder="Start a post"
                  className="w-[752px]  flex items-center h-[48px] rounded-3xl px-5 bg-[#f7f7f8] border-[1px] border-[#d1d1db]"
                />
              </div>
              {/* sub frame 2 */}

              <div className="flex w-[816px] h-[28px] gap-2">
                <Tag tagname="product" />
                <Tag tagname="Webinar" />
                <Tag tagname="Training" />
                <Tag tagname="Label" />
              </div>
            </div>

            <div></div>
          </section>

          <section className="w-[816px] h-[1066px] gap-[16px] mt-5">
            {/* Message box */}

            {/* <MessageContainer/> */}
          </section>
        </main>
      ) : (
        <main className="bg-[#ffffff]  w-[880px] h-[1410px] top-[65px] absolute left-[430px] px-8 gap-6">
          {/* frame 1 */}
          <section className="w-[816px] h-[304px] border-b-[1px] pt-6 pb-4 gap-16">
            {/* Group intro */}
            <div className="w-[816px] h-[160px] border-b-[1px] gap-2">
              {/* avatar */}
              <div className="size-2xl  w-[64px] h-[64px] rounded-full bg-[#EBEBEF]">
                {/* circle */}
                <div className="h-[40px] w-[40px] top-[12px] left-[12px]">
                  <Image
                    className=" absolute top-[42.95px] left-[50.95px]"
                    width={24.17}
                    height={24.17}
                    src={"/cir.svg"}
                    alt="circle"
                  />
                  {/* Notification */}
                  {/* <div className='w-[40px] h-[40x] top-[12px] left-[12px] bg-red-500'>notification</div> */}
                  {/* STATUS */}
                  {/* <div className='w-[16px] h-[16px] top-[48px] left-[48px] embedid-full border-2px bg-green-400'></div> */}
                </div>
              </div>
              <p className="w-[816px] h-[32px] text-3xl mt-2 font-bold text-[#3F3F50] leading-8 size-[30px] ">
                Welcome to NxtJob
              </p>
              <p className="w-[816px] h-[48px] text-base mt-2 leading-6 font-normal size-[16px] text-[#8A8AA3]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>
            </div>
            {/* sub frame 4809... */}
            <div className="w-[816px] mt-3 h-[88px] gap-3">
              {/* input box */}
              <div className=" flex w-[816px] h-[48px] gap-5">
                {/* avatar */}
                <Avatar w={48} h={48} bg="#2dca72" />
                {/* <CreatePost/> */}

                {/* actual input */}
                <input
                  onClick={PostToogle}
                  placeholder="Start a post"
                  className="w-[752px]  flex items-center h-[48px] rounded-3xl px-5 bg-[#f7f7f8] border-[1px] border-[#d1d1db]"
                />
              </div>
              {/* sub frame 2 */}

              <div className="flex w-[816px] h-[28px] gap-2">
                <Tag tagname="product" />
                <Tag tagname="Webinar" />
                <Tag tagname="Training" />
                <Tag tagname="Label" />
              </div>
            </div>

            <div></div>
          </section>

          <section className="w-[816px] h-[1066px]  overflow-y-auto  overflow-x-hidden gap-[16px] mt-5 ">
            <MessageContainer />
          </section>
        </main>
      )}
    </div>
  );
}
