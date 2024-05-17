import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate"
// import { createPostInput } from "daxoriv993-nxt_job_internship"

type Bindings = {
	DATABASE_URL: string;
};

const app = new Hono<{Bindings : Bindings}>();

app.post("/addComment", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try{
		const { text, userId, postId } = await c.req.json();

		// const {success, error} = createPostInput.safeParse({
		// 	text, userId, postId
		// })
		// if(!success){
		// 	c.status(400);
		// 	throw new Error("Bad Request: " + JSON.stringify(error));
		// }

		console.log(text, userId, postId);

		if(!text || !userId || !postId){
			console.log("Bad Request");
			c.status(400);
			throw new Error("Bad Request");
		}

		const existingPost = await prisma.post.findUnique({
			where: { id: postId },
		});

		if (!existingPost) {
			c.status(400);
			throw new Error("Bad Request: Post does not exist");
		}

		const newComment = await prisma.comment.create({
			data: {
				text,
				userId,
				postId
			}
		});
		if(!newComment){
			c.status(500);
			throw new Error("Internal Server Error");
		}
		console.log("Comment Created", newComment);
		return c.json({
			message:
				"Comment Created and I think added to respective posts comments array",
		});
	}
	catch(e){
		console.log(e);
		return c.json({
			message: (e as Error).message
		});
	}
});

export default app;
