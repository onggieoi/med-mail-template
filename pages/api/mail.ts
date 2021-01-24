import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, text } = req.body;

    const testMail = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: testMail.user,
        pass: testMail.pass,
      },
    });

    const mailOption: Options = {
      from: `${email}`,
      to: `${process.env.EMAIL}`,
      subject: `New mail from ${email}`,
      html: '',
    };

    const result = await transporter.sendMail(mailOption);
    console.log(result);
    res.status(200).send(true);
  } else {
    res.status(404).send('Page not Found');
  }
};
