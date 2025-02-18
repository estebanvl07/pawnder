import { User } from "@prisma/client";
import { PostIncludes } from "~/components/Post/types/post";

export interface UserIncludes extends User {
  posts: PostIncludes[];
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
}
