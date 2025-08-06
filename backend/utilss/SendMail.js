import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Finanlytics" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Customer Support',
    html: `<p>Thanks for reaching out to us . We will reach out to you as soon as possible.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendmail;
