import { Hono } from 'hono'
import { PrismaClient, User, Room } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import routes from './routes/routes'
import { upgradeWebSocket } from 'hono/cloudflare-workers';
// import { createClient } from 'redis';
import { Redis } from '@upstash/redis'

const app = new Hono<{
	Bindings : {
		DATABASE_URL: string,
		REDIS_CLOUD: string,
		REDIS_TOKEN: string
	}
}>()


app.get('/', (c) => {
	return c.text('Hello Hono!')
})

app.get('/getUsers', async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const userList = await prisma.user.findMany();
	return c.json({
		userList: userList
	});
})
app.get('/getRooms', async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const userList = await prisma.tag.findMany();
	return c.json({
		userList: userList
	});
})

app.get('/createRoom', async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	try{
		const newRoom = await prisma.room.create({
			data: {
				name: "Test Room",
			}
		});
		if(!newRoom){
			c.status(500);
			throw new Error("Internal Server Error");
		}
		return c.json({
			message: "User Created",
		})
	}
	catch(e){
		console.log((e as Error).message);
		c.json({
			message: (e as Error).message
		});
	}
});
app.get('/createTag', async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	try{
		const newTag = await prisma.tag.create({
			data: {
				name: "Test Tag",
			}
		});
		if(!newTag){
			c.status(500);
			throw new Error("Internal Server Error");
		}
		return c.json({
			message: "Tag Created",
		})
	}
	catch(e){
		console.log((e as Error).message);
		c.json({
			message: (e as Error).message
		});
	}
});
app.get('/createUser', async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	try{
		const newUser = await prisma.user.create({
			data: {
				name: "Test User",
				email: "test@gmail.com",
			}
		});
		if(!newUser){
			c.status(500);
			throw new Error("Internal Server Error");
		}
		return c.json({
			message: "User Created",
		})
	}
	catch(e){
		console.log((e as Error).message);
		c.json({
			message: (e as Error).message
		});
	}
});

app.use("/ws", upgradeWebSocket(async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	return{
		async onMessage(evt, ws) {
			const {roomId, message} = JSON.parse(evt.data as string);
			console.log(roomId, message);

			const room = await prisma.room.findUnique({
				where: {id: roomId}
			});
			console.log(room);
			ws.send("hello from server!");
		},
	}
}));

app.get('/ws', upgradeWebSocket(async (c) =>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const redis = new Redis({
		url: c.env?.REDIS_CLOUD,
		token: c.env?.REDIS_TOKEN
	})

	// const client = createClient({
	// 	password: c.env?.PASSWORD,
	// 	socket: {
	// 		host: c.env?.REDIS_CLOUD,
	// 		port: c.env?.REDIS_PORT
	// 	}
	// });
	
	redis.publish
	

	return {
		// async onOpen(evt, ws) {
		// 	prisma.room.findMany()
		// 		.then(rooms =>{
		// 			rooms.forEach(room =>{
		// 				redis.lpush(`${room.id}${room.name}`, "Hello from server!");
		// 				redis.rpop(`${room.id}${room.name}`, 0)
		// 				// client.subscribe(`${room.id}${room.name}`, (err, count) =>{
		// 				// 	if(err){
		// 				// 		console.log(err);
		// 				// 		throw new Error(err);
		// 				// 	}
		// 				// 	console.log(count);
		// 				// 	console.log(`Subscribed to ${room.id}${room.name}`);
		// 				// 	ws.send(`Subscribed to ${room.id}${room.name}`);
		// 				// })
		// 			})
		// 		})
		// 		.catch(e =>{
		// 			console.log(e);
		// 		})
		// },

		async onMessage(evt, ws) {
			const {roomId, message} = JSON.parse(evt.data as string);
			console.log(roomId, message);

			const room = await prisma.room.findUnique({
				where: {id: roomId}
			});
			console.log(room);
			ws.send("hello from server!");
		},
	}
}));


app.route("/api/v1", routes);

export default app
