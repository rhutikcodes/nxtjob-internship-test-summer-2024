
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
  
  




//increase count of post like (called in messageContainer.tsx)
app.put('increaseLikeCount',async(c)=>{ 
    try {
      const body = await c.req.json()
      const {index} = body
    const postId = index
    
      let {results}  = await c.env.DB.prepare(
        "SELECT likes FROM PostData WHERE postId = ?"
      ) .bind(index).all()
       ;
       console.log(results)
    console.log(results[0].likes)
    
    let data:number= (results[0].likes) as number
    
    console.log(data)
    
        await c.env.DB.prepare(
          "UPDATE PostData SET likes=? WHERE postId = ?"
        ) .bind(++data,postId).all()
    
    
        return c.json({success:true,mssg:data},{status:201})
    }catch (error:unknown) {
      console.log(error)
    }
     
    })




    export default app;