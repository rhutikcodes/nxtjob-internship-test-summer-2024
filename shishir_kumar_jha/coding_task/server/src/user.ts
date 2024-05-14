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



//insert userInfo(called in page.tsx in client-side)
app.post("/userInfo", async (c) => {
    try {
      const body = await c.req.json();
      let { id, firstName, lastName, emailAddress, image } = body;
  
      // const result = await c.env.DB.prepare("SELECT * FROM UserData").all()
      // return c.json({result})
      console.log(id, firstName, lastName, emailAddress, image);
      const userUserParamsCheck = userParamsTypeSchema.safeParse({
        id,
        firstName,
        lastName,
        image,
        emailAddress,
      });
      if (!userUserParamsCheck) throw new Error("plz fill the data properly");
      const { results } = await c.env.DB.prepare(
        "SELECT * FROM UserData WHERE email = ?"
      )
        .bind(emailAddress)
        .all();
  
        //subscribing to the room_id
      console.log("print the data plz1!!!!!")
  
      if (results.length != 0) {
        return c.json({ message: `User already exists`}, { status: 200 });
      }
      if (!image) {
        image = "https://avatars.githubusercontent.com/u/124599?v=4";
      }
  
      // only if firstTime login later can be removed from code
      if (!firstName) firstName = "John";
      if (!lastName) lastName = "Doe";
  
      const resp = await c.env.DB.prepare(
        `
          INSERT INTO UserData (id, image, firstName, lastName, email) 
          VALUES (?, ?, ?, ?, ?)
        `
      )
        .bind(id, image, firstName, lastName, emailAddress)
        .run();
  
      return c.json({ message: resp}, { status: 201 });
    } catch (error:unknown) {
      console.log(error)
    }
  });
  
  
  

  export default app;