import { z } from "zod";
import { updateSchema } from "~/lib/resolver/zod";

const input = {
  content: z.string().min(1, "El contenido no puede estar vacío"),
  //   images: z.array(z.string()),
};

export const createPost = z.object(input);
export type createPost = z.infer<typeof createPost>;
export const updatePost = updateSchema(input);
export type updatePost = z.infer<typeof updatePost>;
