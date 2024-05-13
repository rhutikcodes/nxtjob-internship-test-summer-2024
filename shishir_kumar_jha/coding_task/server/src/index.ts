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










// using cloudfare-websocekts but doesnt provide broadcasting feature

app.use('/ws/',async(c)=>{ 
  const upgradeHeader = c.req.header('Upgrade')
  if (upgradeHeader !== 'websocket') {
    return c.text('Expected websocket', 400)
  }
  const webSocketPair = new WebSocketPair()
  const client = webSocketPair[0]
  const server = webSocketPair[1] as unknown as CFWebSocket

    
  server.accept()
  server.send("hello")
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







//insert newPost (called in createPost component)
app.post("api/v1/createPost",async(c)=>{ 
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
app.get('/api/v1/getAllPosts',async(c:Context)=>{ 
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




//increase count of post like (called in messageContainer.tsx)
app.put('/api/v1/increaseLikeCount',async(c)=>{ 
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



//add comment to particular post (called in Comment.tsx)
app.put('/api/v1/addComment',async(c)=>{ 
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
app.get('/api/v1/getComment/:postId',async(c)=>{ 

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



//insert notification (called in navBar.tsx)
app.post('api/v1/createNotification',async(c)=>{ 

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
app.get('api/v1/getAllNotification',async(c)=>{ 

  try {
    let {results} = await c.env.DB.prepare("SELECT * FROM NotificationData").all()
    console.log(results)
    return c.json({success:true,mssg:results},{status:200})
  } catch (error:unknown) {
    console.log(error)
  }

})





//unknown routes
// app.get("*",(c)=>{ 
//   return c.json({mssg:"page not found"},{status:404})
// })

export default app;
