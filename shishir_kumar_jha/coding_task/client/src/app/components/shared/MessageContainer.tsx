import Image from "next/image";
import Avatar from "./Avatar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { CommentComponent } from "@/features/userData/userDataSlice";
import Comment from "./Comment";
import { pusherClient } from "@/app/lib/pusher";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface postArrayType {
  content: string;
  likes: number;
  parsedContentIdArray: Array<string>;
  userId: string | null | undefined;
  createdAt: string;
  postId: string;
}

export default function MessageContainer() {
  const { userId } = useAuth();
  const [postArray, setPostArray] = useState<Array<postArrayType>>([]);
  // all the posts are initially unliked
  const [hasClicked, setHasClicked] = useState<boolean>(false);

  let postContent = useSelector(
    (state: RootState) => state.postInfo.postContent
  );
  let showcreateCommentComponent = useSelector(
    (state: RootState) => state.userInfo.showcreateCommentComponent
  );
  let commentLength = useSelector(
    (state: RootState) => state.postInfo.comment.commentLength
  );
  let roomIdForComments = useSelector(
    (state: RootState) => state.postInfo.comment.roomId
  );

  const dispatch = useDispatch<AppDispatch>();

  //from websocket create new post
  useEffect(() => {
    if (postContent) {
      // Adding new post to the existing posts array
      setPostArray((prevArray) => [
        ...prevArray,
        {
          content: postContent,
          likes: 0,
          parsedContentIdArray: [],
          userId: userId,
          createdAt: new Date().toISOString(),
          postId: new Date().toISOString(),
        },
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postContent]);

  //coming from store updating in realTime the commentLength
  useEffect(() => {
    function updateRealTimeComment() {
      const updatedArray = postArray.map((post) => {
        if (post.postId === roomIdForComments) {
          return {
            ...post,
            parsedContentIdArray: {
              ...post.parsedContentIdArray,
              length: commentLength,
            },
          };
        }
        return post;
      });

      // Update the state with the modified array
      setPostArray(updatedArray);
    }

    updateRealTimeComment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentLength, roomIdForComments]);

  //fetches all the contents from database in array
  useEffect(() => {
    async function fetchContent() {
      const res = await axios.get(
        "https://coding-task.shishirkj08.workers.dev/api/v1/getAllPosts"
      );
      const contentArray = res.data.mssg;
      setPostArray(() => contentArray);
    }
    fetchContent();
  }, []);

  useEffect(() => {
    //updating likes count in realTime
    // Subscribe to Pusher channel for the roomId
    const channel = pusherClient.subscribe("likeRoom");

    // Bind to the 'increment-like' event to receive new messages
    const handleNewMessage = (message: { count: number; id: string }) => {
      const postIndex = postArray.findIndex(
        (post) => post.postId === message.id
      );
      if (postIndex !== -1) {
        const updatedArray = [...postArray];
        updatedArray[postIndex].likes = message.count;
        setPostArray(updatedArray);
      }
    };

    channel.bind("like-message", handleNewMessage);
    return () => {
      channel.unbind("like-message", handleNewMessage);
      pusherClient.unsubscribe("likeRoom");
    };
  }, [postArray]);

  //find the post whose icon is clicked
  const handleLikeClick = async (index: string) => {
    try {
      let noOflikes;
      for (let i = 0; i < postArray.length; i++) {
        if (postArray[i].postId === index) {
          noOflikes = postArray[i].likes;
        }
      }

      const API_BASE_URL =
        process.env.NEXT_PUBLIC_MODE === "production"
          ? "https://coding-task-eight.vercel.app"
          : "http://localhost:3000";
      //  ws?.send(content)

      const res = await axios.post(`${API_BASE_URL}/api/incrementLikes`, {
        likeCount: noOflikes,
        postId: index,
      });
      toast.success("Post Liked");

      if (res.data.mssg) {
        const resp = await axios.put(
          "https://coding-task.shishirkj08.workers.dev/api/v1/increaseLikeCount",
          { index: index }
        );
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  function toggleCommentComponent(postId: number) {
    dispatch(CommentComponent(postId));
  }

  return (
    <div>
      {/* message starting */}

      {postArray.length != 0 ? (
        postArray.map((content) => (
          // not a good practise to use index
          <div key={parseInt(content.postId)}>
            <div className=" flex mb-[1rem] w-[816px] h-[138px] rounded-2xl border-[1px] border-gray-300 bg-[#ffffff] p-4 gap-3 ">
              {/* avatar bg-[#ff7d52]*/}
              <Avatar w={40} h={40} bg="#ff7d52" />
              {/* mssg content */}
              <div className="w-[740px] h-[114px] gap-6px">
                {/* Name */}
                <div className=" flex items-center justify-between w-[182[px] h-[24px] gap-4">
                  <p className="w-[45px] h-[24px] text-base font-medium size-[16px] text-[#7047eb] ">
                    {content?.userId ? content?.userId : "Anonymous"}
                  </p>
                  <p className="text-xs font-light size-[12px] w-[155px] h-[16px] text-[#8a8aa3]">
                    {content.createdAt ? content.createdAt : "11:15"}
                  </p>
                </div>
                {/* mssg writeen long */}
                <div className="w-[740px] h-[54px] gap-[10px]">
                  <p className="h-[54px] w-[740px] mt-1  font-inter font-normal text-sm leading-5 size-3.5 text-[#3f3f50]">
                    {content.content}
                  </p>
                </div>
                {/* likes save  */}
                <div className="w-[740px] h-[24px] flex items-center  justify-between">
                  {/* heart &chat */}
                  <div className="  w-[113px] h-[24px] gap-2">
                    {/* heart */}
                    <div className="w-[54px] h-[24px] gap-1 mt-4">
                      <div className="flex items-center">
                        <div className="flex  w-[24px] h-[24px]">
                          {!hasClicked && (
                            <Image
                              className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:duration-300"
                              onClick={() => handleLikeClick(content.postId)}
                              src={"/heart.svg"}
                              alt="like"
                              height={12.5}
                              width={14.5}
                            />
                          )}
                          <p className="w-[26px] ml-2 h-[24px] text-sm leading-6 size-3.5 text-[#8a8aa3]">
                            {content.likes}
                          </p>

                          <Image
                            onClick={() => {
                              toggleCommentComponent(parseInt(content.postId));
                            }}
                            src={"chat.svg"}
                            alt="chat"
                            height={13}
                            width={14.5}
                            className="ml-5 cursor-pointer"
                          />

                          {/* <Image src={"/chat1.svg"} alt='chatpart' width={1.5} height={1.5} className='absolute left-[9.7rem] top-[28rem]' /> */}
                          {/* <Image src={"/chat1.svg"} alt='chatpart' width={1.5} height={1.5} className='absolute left-[9.9rem] top-[28rem]' />
<Image src={"/chat1.svg"} alt='chatpart' width={1.5} height={1.5} className='absolute left-[10.2rem] top-[28rem]' /> */}

                          <p className="w-[26px] ml-2 h-[24px] text-sm leading-6 size-3.5 text-[#8a8aa3]">
                            {content?.parsedContentIdArray?.length}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* chat */}
                    <div className="w-[51px] h-[24px] gap-1">
                      <div className="w-[24px] h-[24px]"></div>
                    </div>
                  </div>

                  {/* bookmark */}
                  <div className="mt-8 flex items-center">
                    <Image
                      src={"/ract.svg"}
                      alt="bookmark"
                      height={14.5}
                      width={10.5}
                    />
                    <p className="w-[10.5px] h-[14.5px] mr-9 ml-[3px] mb-[3px] text-sm text-[#8a8aa3]">
                      Save
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}

      {typeof showcreateCommentComponent === "string" ? (
        <Comment roomId={showcreateCommentComponent} />
      ) : (
        ""
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
