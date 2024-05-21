import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { notifCountCache } from "./commentsRoute";

const posts = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

interface PostInput {
  userId: string;
  channelId: string;
  content: string;
}

posts.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body: PostInput = await c.req.json();

  if (!body.content || !body.content.trim()) {
    return c.json({ message: "Content is required" }, 400);
  }

  if (!body.userId || !body.userId.trim()) {
    return c.json({ message: "Login to start posting" }, 400);
  }

  if (!body.channelId || !body.channelId.trim()) {
    return c.json({ message: "ChannelId is required" }, 400);
  }

  try {
    const post = await prisma.post.create({
      data: body,
      include: {
        User: {
          select: {
            username: true, // Select only the username from the User relation
          },
        },
        Comments: true, // Include all comments (You might want to specify fields here as well)
        LikedBy: {
          select: {
            userId: true, // Include UserLikes data (adjust according to your needs)
          },
        },
      },
    });

    const postResponse = {
      postId: post.postId,
      userId: post.userId,
      channelId: post.channelId,
      content: post.content,
      attachment: post.attachment,
      tagId: post.tagId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      username: post.User.username,
      Comments: post.Comments.map((comment) => ({
        commentId: comment.commentId,
        content: comment.content,
        fromUserId: comment.fromUserId,
        likes: comment.likes,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      })),
      likes: post.LikedBy.length, // Assuming you want to count the number of likes
    };

    notifCountCache[postResponse.channelId] =
      (notifCountCache[postResponse.channelId] || 0) + 1;

    return c.json({ ...postResponse, message: "Post created" }, 201);
  } catch (error) {
    console.error("Failed to create post:", error);
    return c.json({ message: "Error creating post" }, 500);
  }
});

posts.get("/count/:channelId", async (c) => {
  const { channelId }: { channelId: string } = c.req.param();

  if (!channelId) {
    return c.json({ message: "ChannelId is required" }, 400);
  }

  if (notifCountCache[channelId]) {
    notifCountCache[channelId] = 0;
    return c.json({ commentCount: 1 });
  }
  return c.json({ commentCount: 0 });
});

posts.get("/:channelId", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const { channelId } = c.req.param();
  const page = parseInt(c.req.query("page") ?? "1", 10) || 1;
  const limit = parseInt(c.req.query("limit") ?? "10", 10) || 10;

  const offset = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      where: {
        channelId: channelId, // Filter posts by channelId
      },
      orderBy: {
        createdAt: "desc",
      },
      cacheStrategy: {
        swr: 10, // Cache for 10 seconds
      },
      skip: offset, // Skip the number of records
      take: limit + 1, // Take one more record than the limit to determine if there's a next page
      select: {
        postId: true,
        content: true,
        userId: true,
        channelId: true,
        tagId: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            username: true,
          },
        },
        Comments: {
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
        },
        _count: {
          select: {
            LikedBy: true, // Count the likes by referring to the relation name
          },
        },
      },
    });

    const hasNextPage = posts.length > limit;
    const formattedPosts = posts.slice(0, limit).map((post) => ({
      ...post,
      username: post.User.username,
      likes: post._count.LikedBy,
      Comments: post.Comments,
    }));

    return c.json(
      {
        data: formattedPosts,
        meta: {
          page: page,
          limit: limit,
          hasNextPage: hasNextPage,
        },
      },
      200
    );
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return c.json({ message: "Error fetching posts" }, 500);
  }
});

// get all comments for a specific post
posts.get("/:postId/comments", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const { postId } = c.req.param();

  if (!postId || !postId.trim()) {
    return c.json({ message: "PostId is required" }, 400);
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        commentId: true,
        content: true,
        fromUserId: true,
        postId: true,
      },
    });
    return c.json(comments, 200);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return c.json({ message: "Error fetching comments" }, 500);
  }
});

// like and unlike post
posts.post("/:postId/like", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const { postId } = c.req.param();
  const { userId } = await c.req.json();
  console.log(userId);

  if (!postId || !postId.trim()) {
    return c.json({ message: "PostId is required" }, 400);
  }
  if (!userId) {
    return c.json({ message: "UserId is required" }, 400);
  }

  try {
    const likeExists = await prisma.userLikes.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    if (likeExists) {
      const unlikedPost = await prisma.userLikes.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      });
      return c.json({ ...unlikedPost, message: "Unliked" }, 200);
    } else {
      const likedPost = await prisma.userLikes.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
      return c.json({ ...likedPost, message: "Liked" }, 200);
    }
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return c.json(
      { message: "Error processing your like/unlike request" },
      500
    );
  }
});

export default posts;
