import { Comment, Images, Post, User } from "@prisma/client";

export interface PostIncludes extends Post {
  images?: Images[];
  comments?: PostIncludes[];
  createdBy?: User;
  _count: {
    comments: number;
    likes: number;
  };
}
