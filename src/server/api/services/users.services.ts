import type { Prisma, PrismaClient } from "@prisma/client";
import { recoverUserEmail, sendConfirmationEmail } from "./email.services";
import type { RegisterUserInputType } from "~/modules/Signin/Register/schema";
import { comparePassword, hashPassword } from "~/utils/crypto";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// import {
//   geActivationCode,
//   getRecoveryCode,
//   getRecoveryCodeById,
//   updateVerificationCodeUsage,
//   VerificationCodeType,
// } from "./verificationCode.services";
import type { PrismaTransaction } from "~/server/db";
// import type {
//   VerifyCodeInputType,
//   ChangePasswordInputType,
// } from "~/modules/Recover/resolver";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import {
  geActivationCode,
  getRecoveryCode,
  updateVerificationCodeUsage,
  VerificationCodeType,
} from "./verificationCode.services";
import { RequestError } from "~/utils/errors";

export async function getUserByTag(
  db: PrismaClient,
  options: {
    userTag: string;
    post: boolean;
    commentsOfPost: boolean;
  },
) {
  const { userTag, commentsOfPost, post } = options;

  try {
    const postsFound = await db.user.findFirst({
      where: {
        userTag,
      },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
        posts: post && {
          include: {
            createdBy: true,
            images: true,
            comments: commentsOfPost,
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        },
      },
    });

    return postsFound;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(
  db: PrismaClient,
  data: RegisterUserInputType,
) {
  try {
    async function userAccountTransaction(tx: PrismaTransaction) {
      const password = hashPassword(data.password);
      const user = await tx.user.create({
        data: {
          email: data.email.toLowerCase(),
          name: data.name,
          userPassword: {
            create: {
              password,
              email: data.email.toLowerCase(),
            },
          },
        },
        include: {
          userPassword: true,
        },
      });

      await tx.account.create({
        data: {
          provider: "credentials",
          providerAccountId: user.userPassword!.id,
          type: "credentials",
          userId: user.id,
        },
      });

      user.userPassword = null;
      return user;
    }

    const user = await db.$transaction(async (tx) => {
      const user = await userAccountTransaction(tx);
      console.log("user registered", user);
      await sendConfirmationEmail(tx, user);
    });

    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (
        error.code === "P2002" &&
        (error.meta as { target: string[] })?.target.includes("email")
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Ha ocurrido un error, prueba con otro correo o intenta más tarde",
        });
      }
    }
    throw error;
  }
}

export async function update(
  db: PrismaClient,
  userData: Prisma.UserUncheckedUpdateInput,
) {
  try {
    const userFound = await db.user.findFirst({
      where: {
        id: userData.id as string,
      },
      include: {
        userPassword: true,
      },
    });

    if (!userFound) {
      throw new Error("Usuario no encontrado");
    }

    await db.user.update({
      where: {
        id: userData.id as string,
      },
      data: {
        ...userData,
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Ha ocurrido un error, prueba con otro correo o intenta más tarde",
    });
  }
}

export async function requiredPassword(db: PrismaClient, userId: string) {
  try {
    const hasPassword = await db.userPassword.findFirst({
      where: {
        id: userId,
      },
    });

    return { hasPassword: Boolean(hasPassword) };
  } catch (error) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Ha ocurrido un error, prueba con otro correo o intenta más tarde",
    });
  }
}

export async function createPassword(
  db: PrismaClient,
  userId: string,
  password: string,
) {
  try {
    const userFound = await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        userPassword: true,
      },
    });

    if (!userFound?.email && userFound) {
      throw new Error("Este usuario no tiene un email registrado");
    }

    const passwordHashed = hashPassword(password);

    if (!userFound?.email) {
      throw new Error("Correo no registrado");
    }

    await db.userPassword.create({
      data: {
        userId,
        password: passwordHashed,
        email: userFound?.email,
      },
    });

    return true;
  } catch (error) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Ha ocurrido un error, prueba con otro correo o intenta más tarde",
    });
  }
}

export async function activateUser(db: PrismaClient, code: string) {
  const { userId, id: verificationCodeId } = await geActivationCode(db, code);

  const user = await db.user.update({
    where: {
      id: userId,
      emailVerified: null,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await updateVerificationCodeUsage(
    db,
    verificationCodeId,
    VerificationCodeType.Activation,
  );

  return user;
}

export async function getUserByEmail(db: PrismaClient, email: string) {
  return db.user.findUnique({
    where: { email },
  });
}

export async function authPasswordUser(
  db: PrismaClient,
  email: string,
  password: string,
) {
  const user = await db.user.findUnique({
    where: { email },
    include: {
      userPassword: {
        select: {
          password: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  if (!user.userPassword) {
    return null;
  }

  const isPasswordMatching = comparePassword(
    password,
    user.userPassword.password,
  );

  if (!isPasswordMatching) {
    return null;
  }

  return user;
}

export async function setPassword(
  db: PrismaClient,
  email: string,
  password: string,
  userId: string,
) {
  try {
    const passwordHashed = hashPassword(password);

    const userFound = await db.userPassword.findFirst({
      where: {
        userId,
      },
    });

    if (userFound) {
      await db.userPassword.update({
        where: {
          userId,
        },
        data: {
          email,
          password: passwordHashed,
        },
      });
    } else {
      await db.userPassword.create({
        data: {
          userId,
          email,
          password: passwordHashed,
        },
      });
    }
  } catch (error) {
    throw error;
  }
}

// TODO: REVIEW
// export async function changePassword(
//   db: PrismaClient,
//   code: string,
//   password: string,
// ) {
//   try {
//     const { userId, id: verificationCodeId } = await geActivationCode(db, code);

//     const passwordHashed = hashPassword(password);

//     const user = await db.user.findFirst({
//       where: {
//         id: userId,
//       },
//     });

//     if (!user) {
//       throw new TRPCError({
//         code: "NOT_FOUND",
//         message: "El usuario no ha sido encontrado",
//       });
//     }

//     const [userPass] = await db.userPassword.findMany({
//       where: {
//         userId,
//       },
//     });

//     console.log("user pass", userPass);
//     if (!userPass) {
//       console.log("because not user found");

//       await db.userPassword.create({
//         data: {
//           state: 1,
//           userId,
//           email: user.email,
//           password: passwordHashed,
//         },
//       });
//     } else {
//       await db.userPassword.update({
//         where: {
//           userId,
//         },
//         data: {
//           password: passwordHashed,
//         },
//       });
//     }

//     await updateVerificationCodeUsage(
//       db,
//       verificationCodeId,
//       VerificationCodeType.Activation,
//     );

//     return user;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function recoverUser(db: PrismaClient, email: string) {
  const userWithPassword = await db.user.findUnique({
    where: {
      email,
    },
    include: {
      userPassword: true,
    },
  });

  if (!userWithPassword || !userWithPassword?.userPassword) {
    // Si el usuario existe pero no tiene contraseña enviar un correo que se intento ingresar con contraseña y que solo tiene habilitado x, Ex. Google, Facebook
    throw new Error(
      "Este usuario está asociado a un servicio de autentificación externo",
    );
  }

  await recoverUserEmail(db, userWithPassword);
}

// TODO: REVIEW RECOVERY PASSWORD

// export async function recoverVerify(
//   db: PrismaClient,
//   data: VerifyCodeInputType,
// ) {
//   const { id: codeId } = await getRecoveryCode(db, data.code, data.email);

//   const payload = { codeId };
//   const token = jwt.sign(payload, env.JWT_CHANGE_PASSWORD, {
//     expiresIn: "1h",
//   });

//   return token;
// }

// export async function recoverChangePassword(
//   db: PrismaClient,
//   data: ChangePasswordInputType,
// ) {
//   const payload = jwt.verify(data.token, env.JWT_CHANGE_PASSWORD);
//   if (typeof payload !== "object" || typeof payload.codeId !== "number") {
//     throw new TRPCError({
//       code: "BAD_REQUEST",
//       message: "Token inválido",
//     });
//   }

//   const { userId, id: codeId } = await getRecoveryCodeById(db, payload.codeId);

//   const password = hashPassword(data.password);

//   await db.$transaction(async (tx) => {
//     await tx.userPassword.update({
//       where: {
//         userId,
//       },
//       data: {
//         password,
//       },
//     });

//     await updateVerificationCodeUsage(
//       tx,
//       codeId,
//       VerificationCodeType.Recovery,
//     );
//   });
// }
