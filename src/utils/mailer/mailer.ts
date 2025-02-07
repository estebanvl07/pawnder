import { RecoveryEmail } from "./recoveryEmail";
import { SignInTemplate } from "./signInEmail";
import nodemailer, { type Transport } from "nodemailer";
import BrevoTransport from "nodemailer-brevo-transport";
import { env } from "~/env";
import { reminderMovement } from "./reminderMovement";
// import { FixedMovements } from "@prisma/client";

const FROM_NO_REPLAY = "Pawnder <viloriajoel10@gmail.com>";

const getBrevoTransport = (): Transport<string> =>
  new BrevoTransport({ apiKey: env.NODEMAILER_KEY }) as never;

const transporter = nodemailer.createTransport(getBrevoTransport());

const handleMailerError = (err: Error | null) => {
  if (err) {
    console.log("[MAIL_ERROR]", err);
  }
};

export const mailer = {
  async userConfirmationEmail({
    to,
    token,
    name,
  }: {
    to: string;
    token: string;
    name: string;
  }) {
    const link = `${env.FRONTEND_URL}/activation/${token}`;
    const signUpOptions = {
      from: FROM_NO_REPLAY,
      to,
      subject: "Bienvenido a Biru",
      html: SignInTemplate({ name, link }),
    };

    return transporter.sendMail(signUpOptions, handleMailerError);
  },
  recoverUser({ to, name, code }: { to: string; name: string; code: string }) {
    // TODO: const link = `${env.FRONTEND_URL}/recover/${code}`;
    const recoverOptions = {
      from: FROM_NO_REPLAY,
      to,
      subject: "Recuperación de usuario Biru",
      html: RecoveryEmail({
        name,
        code,
      }),
    };
    return transporter.sendMail(recoverOptions, handleMailerError);
  },
};
