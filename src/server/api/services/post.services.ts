import { PrismaClient } from "@prisma/client";

export async function getPostById(db: PrismaClient, id: number) {
  try {
    const postFound = await db.post.findFirst({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        comments: {
          include: {
            createdBy: true,
            post: {
              include: {
                _count: {
                  select: {
                    comments: true,
                    likes: true,
                  },
                },
                images: true,
                comments: true,
              },
            },
          },
        },
        createdBy: true,
        images: true,
      },
    });

    return postFound;
  } catch (error) {
    throw error;
  }
}
