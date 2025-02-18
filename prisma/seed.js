import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Crear 10 usuarios
  const users = await Promise.all(
    Array.from({ length: 30 }).map(() =>
      prisma.user.create({
        data: {
          id: faker.string.uuid(),
          username: faker.internet.username(),
          userTag: faker.string.alphanumeric(10),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          biography: faker.lorem.sentence(),
          location: faker.location.city(),
          website: faker.internet.url(),
          image: faker.image.avatar(),
          coverImage: faker.image.urlPicsumPhotos(),
        },
      }),
    ),
  );

  // Crear 20 posts sobre animales
  const posts = await Promise.all(
    Array.from({ length: 40 }).map(() => {
      const user = faker.helpers.arrayElement(users);
      const hasImages = faker.datatype.boolean(); // 50% de los posts tendrán imágenes
      return prisma.post.create({
        data: {
          content: faker.animal.type() + " - " + faker.lorem.sentence(),
          createdById: user.id,
          images: hasImages
            ? {
                create: {
                  url: faker.image.urlLoremFlickr({ category: "animals" }),
                  createdById: user.id,
                },
              }
            : undefined,
        },
      });
    }),
  );

  // Crear comentarios en los posts
  await Promise.all(
    posts.flatMap((post) =>
      Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => {
        const user = faker.helpers.arrayElement(users);
        return prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            postId: post.id,
            createdById: user.id,
          },
        });
      }),
    ),
  );

  // Crear likes en los posts
  await Promise.all(
    posts.flatMap((post) =>
      Array.from({ length: faker.number.int({ min: 3, max: 20 }) }).map(() => {
        const user = faker.helpers.arrayElement(users);
        return prisma.likes.create({
          data: {
            userId: user.id,
            postId: post.id,
          },
        });
      }),
    ),
  );

  console.log("✅ Seeding completed!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
