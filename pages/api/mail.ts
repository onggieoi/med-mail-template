import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { to, subject, dataHtml } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com',
      service: 'Gmail',
      auth: {
        user: `${process.env.USERMAIL}` || '',
        pass: `${process.env.PASSWORDMAIL}` || '',
      },
    });

    const mailOption: Options = {
      from: 'Your Teacher',
      to: `${to}`,
      subject: `${subject}`,
      html: `${dataHtml}`,
    };

    try {
      await transporter.sendMail(mailOption);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ isDone: true }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ isDone: false }));
    }
  } else {
    res.status(404).send('Page not Found');
  }
};
