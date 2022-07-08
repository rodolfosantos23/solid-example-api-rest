import { IMailProvider, IMessage } from "./../IMailProvider";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import * as dotenv from "dotenv";

export class MailTrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    dotenv.config();

    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_HOST.toString(),
      port: process.env.MAIL_TRAP_PORT,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASS,
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.to.name,
        address: message.to.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
