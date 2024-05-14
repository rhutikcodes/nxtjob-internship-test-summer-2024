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



//add comment to particular post (called in Comment.tsx)
app.put('/addComment',async(c)=>{ 
    try {
      
      const body = await c.req.json()
      const {comment,index} = body
    const postId = index.toString()
    
      let {results}  = await c.env.DB.prepare(
        "SELECT commentIdArray FROM PostData WHERE postId = ?"
      ) .bind(index).all();
       
    
      let data:string= (results[0].commentIdArray) as string
      console.log(JSON.parse(data))
    
    let array:Array<string> = JSON.parse(data) 
      array.push(comment)
     const updatedArray:string =  JSON.stringify(array)
    
      await c.env.DB.prepare(
        "UPDATE PostData SET commentIdArray=? WHERE postId = ?"
      ) .bind(updatedArray,postId).all()
    
    return c.json({success:"true",mssg:"commentIdarray updated"},{status:200})
    
    
    
    
    } catch (error:unknown) {
      console.log(error)
    }
    
    })
    
    
    
    
    //retrieve comments of particular post (called in Comment.tsx )
    app.get('/getComment/:postId',async(c)=>{ 
    
      try {
        const postId = c.req.param('postId')
    console.log(postId)
    
    let {results}  = await c.env.DB.prepare(
      "SELECT commentIdArray FROM PostData WHERE postId = ?"
    ) .bind(postId).all();
     
    
    let data:string= (results[0].commentIdArray) as string
      const commentArray:Array<string> = JSON.parse(data)
    
      return c.json({success:true,mssg:commentArray},{status:200})
      } catch (error:unknown) {
        console.log(error)
      }
    })













export default app;