import { Hono } from "hono";
import Comments from "./Comments/Comments";
import Posts from "./Posts/Posts";
import { PrismaClient } from "@prisma/client/edge";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	}
	// use c.get and c.set to set prismaClient
	Variables: {
		prisma: PrismaClient
	}
}>();

app.route("/comment", Comments);
app.route("/post", Posts);

export default app
