import { Context, Hono } from "hono";
import {userParamsTypeSchema,postContentParamTypeSchmea } from "coding-project";
import { cors } from "hono/cors";
import type { WebSocket as CFWebSocket } from '@cloudflare/workers-types'
import UUID from "uuid-int"




type Bindings = {
  DB: D1Database;
  MY_VAR: string;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use("*", cors());


//insert newPost (called in createPost component)
app.post("/createPost",async(c)=>{ 
    try {
      const body = await c.req.json()
  const {content,userId} = body
  
  
  if(!postContentParamTypeSchmea)
    { 
      return c.json({success:false,mssg:"plz enter valid post"},{status:400})
    }
  
  
  const channelId = "Career Discussion"
  
  
  // number  0 <= id <=511
  const id = 511;
  
  const generator = UUID(id);
  
  const uuid = generator.uuid();
  
  const postId = uuid.toString()
  const attachment = "attachment"
  const commentIdArray = JSON.stringify([])
  const likes = 0
  const tagIdArray = JSON.stringify([])
  const now = new Date().toISOString();;
  const resp = await c.env.DB.prepare(
    `
      INSERT INTO PostData (postId,userId,channelId,content,attachment,commentIdArray,likes,tagIdArray,updatedAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  )
    .bind(postId, userId, channelId,content, attachment, commentIdArray,likes,tagIdArray,now)
    .run();
  
  
    return c.json({success:"true",mssg:resp},{status:201})
    } catch (error:unknown) {
      console.log(error)
    }
    
  
  })
  
  
  
  
  
  //getAllposts (called in messageContainer.tsx)
  app.get('/getAllPosts',async(c:Context)=>{ 
    try {
  
            const {results} = await c.env.DB.prepare("SELECT * FROM PostData").all()
  
            console.log(results)
            let arr = [];
            for(let i =0;i<results.length;i++)
              { 
                const {content,likes,commentIdArray,userId,createdAt,postId} = results[i]
                const parsedContentIdArray = JSON.parse(commentIdArray)
                arr.push({content,likes,parsedContentIdArray,userId,createdAt,postId})
              }
  
           return c.json({mssg:arr},{status:200})
      
    } catch (error:unknown) {
      console.log(error)
    }
  })
  
  export default app;