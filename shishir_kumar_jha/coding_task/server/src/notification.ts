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






//insert notification (called in navBar.tsx)
app.post('/createNotification',async(c)=>{ 

    try {
      const body = await c.req.json()
  const {notification} = body
  
  const id = 311;
  const generator = UUID(id);
  const uuid = generator.uuid();
  const n_id = uuid.toString()
  
  const resp = await c.env.DB.prepare(
    `
      INSERT INTO NotificationData (id,content) 
      VALUES (?, ?)
    `
  )
    .bind(n_id,notification)
    .run();
  
    return c.json({success:true,mssg:resp},{status:201})
    } catch (error:unknown) {
      console.log(error)
    }
  
  })
  
  
  
  //get all  notification (called in navBar.tsx)
  app.get('/getAllNotification',async(c)=>{ 
  
    try {
      let {results} = await c.env.DB.prepare("SELECT * FROM NotificationData").all()
      console.log(results)
      return c.json({success:true,mssg:results},{status:200})
    } catch (error:unknown) {
      console.log(error)
    }
  
  })
  
  







export default app;