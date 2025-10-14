import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined
});

export async function sendContactMail({ to, name, email, subject, message }) {
  const info = await transporter.sendMail({
    from: env.smtp.from,
    to,
    subject: `[TTA] ${subject}`,
    text: `De: ${name} <${email}>\n\n${message}`,
    html: `<p><b>De:</b> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g,'<br>')}</p>`
  });
  return info.messageId;
}
