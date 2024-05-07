import { z } from "zod";

export const userParamsTypeSchema = z.object({
    id: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    image: z.string().nullable().optional(),
    emailAddress: z.string().nullable(),
});


export type userParamsType = z.infer<typeof userParamsTypeSchema>;