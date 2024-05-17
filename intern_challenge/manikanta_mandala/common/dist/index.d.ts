import z from "zod";
export declare const createPostInput: z.ZodObject<{
    content: z.ZodString;
    like: z.ZodDefault<z.ZodNumber>;
    authorId: z.ZodNumber;
    roomId: z.ZodNumber;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    content: string;
    like: number;
    authorId: number;
    roomId: number;
    tags: string[];
}, {
    content: string;
    authorId: number;
    roomId: number;
    like?: number | undefined;
    tags?: string[] | undefined;
}>;
export type CreatePostInput = z.infer<typeof createPostInput>;
export declare const addCommentInput: z.ZodObject<{
    text: z.ZodString;
    userId: z.ZodNumber;
    postId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    text: string;
    userId: number;
    postId: number;
}, {
    text: string;
    userId: number;
    postId: number;
}>;
export type AddCommentInput = z.infer<typeof addCommentInput>;
