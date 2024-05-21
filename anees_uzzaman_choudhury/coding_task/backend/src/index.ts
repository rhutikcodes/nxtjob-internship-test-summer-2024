import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { upgradeWebSocket } from 'hono/cloudflare-workers'
import posts from './routes/postsRoute'
import users from './routes/userRoute'
import comments from './routes/commentsRoute'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
}>()

app.use('/*', cors()) 

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/posts', posts)

app.route('/api/v1/comments', comments)

app.route('/api/v1/users', users)

app.get('/api/v1/counts', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
}).$extends(withAccelerate())
  try {
      const counts = await prisma.post.groupBy({

          by: ['channelId'],
          _count: {
              channelId: true,
          },
          cacheStrategy: {
                ttl: 8, // Cache for 8 seconds
          },
          where: {
              // Any filters if needed, e.g., isActive, not deleted, etc.
          },
      });

      // Transform the data into a more friendly format for the frontend
      const formattedCounts = counts.reduce((acc: any, curr: any) => {
          acc[curr.channelId] = curr._count.channelId;
          return acc;
      }, {});

      return c.json(formattedCounts, 200);
  } catch (error) {
      console.error('Failed to fetch counts:', error);
      return c.json({ message: 'Error fetching counts' }, 500);
  }
});

// export const clients = new Set();

 // WebSocket endpoint for real-time interactions and notifications
// const userConnections = new Map(); // Map to hold userId and WebSocket connection

// app.use('/ws', upgradeWebSocket(async (c) => {
//     return {
//         onOpen: (ws: any) => {
//             console.log("Client connected");
//             ws.onmessage = (evt: any) => {
//                 const { type, userId, recipientId, content } = JSON.parse(evt.data);

//                 if (type === 'register') {
//                     userConnections.set(userId, ws);
//                     console.log(`${userId} registered`);
//                 } else if (type === 'send') {
//                     console.log(`Message from ${userId} to ${recipientId}: ${content}`);
//                     const recipientWs = userConnections.get(recipientId);
//                     if (recipientWs) {
//                         recipientWs.send(JSON.stringify({ from: userId, content }));
//                     } else {
//                         console.log(`Recipient ${recipientId} not connected.`);
//                     }
//                 }
//             };

//             ws.onclose = () => {
                 // Remove user connection when they disconnect
//                 userConnections.forEach((value, key) => {
//                     if (value === ws) {
//                         userConnections.delete(key);
//                         console.log(`${key} disconnected`);
//                     }
//                 });
//             };
//         }
//     };
// }));

// app.fire()  

  
  // Function to broadcast notifications to all connected clients
// export function broadcastNotification(message: any) {
//     console.log('Broadcasting notification:', message);
//     clients.forEach((client: any) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(message);
//         } else {
//             console.log("Skipping closed connection");
//         }
//     });
// }
  
  // Define other routes and middleware as necessary
  
app.fire();


export default app
