import { Hono } from "hono";
import {userParamsTypeSchema } from "coding-project";
import { uuidv7 } from "uuidv7";
import { cors } from "hono/cors";
import type { WebSocket as CFWebSocket } from '@cloudflare/workers-types'



type Bindings = {
  DB: D1Database;
  MY_VAR: string;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use("*", cors());



//insert userInfo
app.post("api/v1/userInfo", async (c) => {
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

    if (results.length != 0) {
      return c.json({ message: "User already exists" }, { status: 200 });
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

    return c.json({ message: resp }, { status: 201 });
  } catch (error: any) {
    throw new Error(error);
  }
});



app.get('/ws',async(c)=>{ 
  const upgradeHeader = c.req.header('Upgrade')
  if (upgradeHeader !== 'websocket') {
    return c.text('Expected websocket', 400)
  }

  const webSocketPair = new WebSocketPair()
  const client = webSocketPair[0]
  const server = webSocketPair[1] as unknown as CFWebSocket
  server.accept()

  server.addEventListener("message",({data})=>{ 
        if(data)
          { 
            server.send(data)
          }
  })
  return new Response(null, {
    status: 101,
    webSocket: client,
  })
})













//insert newPost
app.post("api/v1/createPost",async(c)=>{ 
  const body = await c.req.json()
const {content} = body

})



export default app;
