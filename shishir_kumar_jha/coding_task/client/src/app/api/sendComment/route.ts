import { NextResponse,NextRequest } from "next/server";
import { pusherServer } from "@/app/lib/pusher";


export async function POST(req:NextRequest){
    try {
        
const body = await req.json()
const {roomId,comment} = body

await pusherServer.trigger(roomId,'comment-message',comment);
return NextResponse.json({"success":"true","mssg":{roomId,comment}},{status:201})
    } catch (error:unknown) {
    console.log("errorWhile sendingMessage:",error)
    }

}