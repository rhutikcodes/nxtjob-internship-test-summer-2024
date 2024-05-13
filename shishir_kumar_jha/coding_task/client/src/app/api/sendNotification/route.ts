import { NextResponse,NextRequest } from "next/server";
import { pusherServer } from "@/app/lib/pusher";


export async function POST(req:NextRequest){
    try {
        
const body = await req.json()
const {content} = body

await pusherServer.trigger("notification",'new-notification',content);
return NextResponse.json({"success":"true","mssg":"notification sent thru websockets"},{status:201})
    } catch (error:unknown) {
    console.log("errorWhile sendingMessage:",error)
    }

}