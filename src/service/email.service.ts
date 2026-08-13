import { tarnsporter } from "../configs/email.configs";

export class EmailService{
   static async sendEmail(to: string, subject: string, html: string) {
    await tarnsporter.sendMail({
        from: `"Hello there" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });
   }
}