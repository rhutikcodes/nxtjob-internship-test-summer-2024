import z from "zod"

export const createPostInput = z.object({
	content: z.string(),
	like: z.number().default(0),
	authorId: z.number(),
	roomId: z.number(),
	tags: z.array(z.string()).default([]),
});

export type CreatePostInput = z.infer<typeof createPostInput>;

export const addCommentInput = z.object({
	text: z.string(),
	userId: z.number(),
	postId: z.number(),
});

export type AddCommentInput = z.infer<typeof addCommentInput>;
