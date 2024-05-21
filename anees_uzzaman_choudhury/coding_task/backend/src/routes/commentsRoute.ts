import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const comments = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

interface CommentInput {
  postId: string;
  userId: string;
  content: string;
}

interface CommentInput {
  postId: string;
  userId: string;
  content: string;
}

comments.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: CommentInput = await c.req.json();

  if (!body.postId.trim()) {
    return c.json({ message: "PostId is required" }, 400);
  }

  if (!body.userId.trim()) {
    return c.json({ message: "UserId is required" }, 400);
  }

  if (!body.content.trim()) {
    return c.json({ message: "Content is required" }, 400);
  }

  // Check if the post exists
  const postExists = await prisma.post.findUnique({
    where: { postId: body.postId },
    select: { postId: true, channelId: true }, // Only fetch the postId to check existence
  });
  // console.log(postExists?.channelId);

  if (!postExists) {
    return c.json({ message: "Post not found" }, 404);
  }

  // Create the comment
  try {
    const comment = await prisma.comment.create({
      data: {
        postId: body.postId,
        fromUserId: body.userId,
        content: body.content,
        channelId: postExists.channelId,
      },
      select: {
        commentId: true,
        content: true,
        fromUserId: true,
        createdAt: true,
        User: {
          select: {
            username: true,
          },
        },
      },
    });
    notifCountCache[postExists.channelId] =
      (notifCountCache[postExists.channelId] || 0) + 1;

    return c.json({ ...comment, message: "Comment created" }, 201);
  } catch (error) {
    console.error("Failed to create comment:", error);
    return c.json({ message: "Error creating comment" }, 500);
  }
});

// an extra in-memory cache for no. of comments and posts
export let notifCountCache: { [key: string]: number } = {};

comments.get("/:channelId", async (c) => {
  const { channelId } = c.req.param();

  if (!channelId) {
    return c.json({ message: "ChannelId is required" }, 400);
  }

  if (notifCountCache[channelId]) {
    notifCountCache[channelId] = 0;
    return c.json({ notifCount: 1 });
  }
  return c.json({ notifCount: 0 });
});

export default comments;
