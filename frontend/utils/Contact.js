
import dotenv from 'dotenv';
dotenv.config();

const sendmail = async (email, ) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:"divyanshuchoubey8210@gmail.com",
      pass:"obni ltds pwwi rnqz",
    },
  });

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Customer support',
    html: `<p>Thanks for contacting us. We will reach out to you shortly.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendmail;
