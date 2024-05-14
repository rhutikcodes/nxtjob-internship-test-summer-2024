import { NextResponse, NextRequest } from "next/server";
import { pusherServer } from "@/app/lib/pusher";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { likeCount, postId } = body;
    console.log(likeCount + 1, postId);
    await pusherServer.trigger("likeRoom", "like-message", {
      count: likeCount + 1,
      id: postId,
    });
    return NextResponse.json(
      { success: "true", mssg: postId },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log("errorWhile sendingMessage:", error);
  }
}
