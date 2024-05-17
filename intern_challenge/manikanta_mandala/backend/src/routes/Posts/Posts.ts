import { Hono } from "hono";
import { PrismaClient, Post, Tag} from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
// import { createClient } from "redis";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		// PASSWORD: string,
		// REDIS_CLOUD: string,
		// REDIS_PORT: number
	}
	Variables: {
		prisma: PrismaClient
	}
}>();

app.post("/createPost", async (c) => {
	const body = await c.req.json();
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try{
		const { content, like, authorId, roomId, tags } = body;
		// const client = createClient({
		// 	password: c.env?.PASSWORD,
		// 	socket: {
		// 		host: c.env?.REDIS_CLOUD,
		// 		port: c.env?.REDIS_PORT
		// 	}
		// });

		if(!content || !like || !authorId || !roomId || !tags){
			console.log(content, like, authorId, roomId, tags);
			c.status(400);
			throw new Error("Bad Request");
		}
		const existingUser = await prisma.user.findUnique({
			where: { id: roomId }
		})
		const existingRoom = await prisma.room.findUnique({
			where: { id: roomId }
		})
		const existingTags = await prisma.tag.findMany({
			where: {
				name: { in: tags.map((tag: Tag) => tag.name) }
			}
		});
		if(!existingRoom){
			console.log("Bad Request: Room does not exist");
			throw new Error("Bad Request: Room does not exist");
		}
		if(!existingUser){
			console.log("Bad Request: User does not exist");
			throw new Error("Bad Request: User does not exist");
		}
		if(existingTags.length !== tags.length){
			console.log("Bad Request: Tag does not exist");
			throw new Error("Bad Request: Tag does not exist");
		}

		const newPost = await prisma.post.create({
			data: {
				content,
				likes: like,
				roomId,
				authorId,
				comments: { create: [] },
				tags: {
					connectOrCreate: tags.map((tag: Tag) => ({
						where: { name: tag.name },
						create: { name: tag.name }
					}))
				}
			}
		});

		if(!newPost){
			c.status(500);
			throw new Error("Internal Server Error");
		}

		// Add the post to room Redis


		console.log("Post created", newPost);
		return c.json({
			message: "Post created"
		});
	}catch(e){
		console.log((e as Error).message);
		return c.json({
			message: (e as Error).message
		});
	}


});

app.get("/getPostsByRoomId/", async (c) =>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	try{
		const roomId = c.req.query('roomId');
		if(!roomId){
			console.log("Bad Request");
			c.status(400);
			throw new Error("Bad Request");
		}

		const posts = await prisma.post.findMany({
			where:{
				roomId: Number(roomId)
			}
		});

		if(!posts){
			c.status(500);
			throw new Error("Internal Server Error");
		}
		return c.json({
			message: "Fetched Posts",
			posts: posts
		})

	}
	catch(e){
		console.log((e as Error).message);
		return c.json({
			message: (e as Error).message
		});
	}
});

export default app;
