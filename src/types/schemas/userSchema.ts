import { Z_EMAIL, Z_PASSWORD, Z_STRING, messages, z } from "~/lib/resolver/zod";

export const input = {
  username: Z_STRING.min(3, messages.length(3)),
  email: Z_EMAIL,
  location: z.string().optional(),
  website: z.string().optional(),
  biography: z.string().optional(),
  userTag: z.string().optional(),
};

export const updateUser = z.object(input);
export type updateUser = z.infer<typeof updateUser>;
