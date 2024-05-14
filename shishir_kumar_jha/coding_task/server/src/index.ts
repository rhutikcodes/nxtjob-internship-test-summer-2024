import { Context, Hono } from "hono";
import {userParamsTypeSchema,postContentParamTypeSchmea } from "coding-project";
import { cors } from "hono/cors";
import type { WebSocket as CFWebSocket } from '@cloudflare/workers-types'
import UUID from "uuid-int"
import user from './user'
import post from './post'
import likes from './likes'
import comment from './comment'
import notification from './notification'

type Bindings = {
  DB: D1Database;
  MY_VAR: string;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use("*", cors());








app.route('/api/v1',user)



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






app.route('/api/v1',post)



app.route('/api/v1',likes)


app.route('/api/v1',notification)

app.route('/api/v1',comment)






// unknown routes
app.get("*",(c)=>{ 
  return c.json({mssg:"page not found"},{status:404})
})

export default app;
