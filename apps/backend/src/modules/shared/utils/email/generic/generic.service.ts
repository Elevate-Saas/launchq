/* eslint-disable @typescript-eslint/no-require-imports */
const nodemailer = require('nodemailer');
import { Injectable } from '@nestjs/common';
import { IEmailService } from '../abstract';
import { ISendEmail } from '../types';

@Injectable()
export class GenericEmailService implements IEmailService {
  async send(payload: ISendEmail): Promise<void> {
    const {
      fromEmail,
      toEmail,
      fromPassword,
      subject,
      html,
      attachments,
      host,
      port,
    } = payload;

    try {
      const config = {
        host,
        secure: 'true',
        port,
        auth: {
          user: fromEmail,
          pass: fromPassword,
        },
        tls: {
          rejectUnauthorized: false,
          ciphers: 'SSLv3',
        },
        logger: true,
        debug: true,
      };
      const smtpTransport = nodemailer.createTransport(config);

      const mail = {
        to: toEmail,
        subject: subject,
        from: `Luke Health <${fromEmail}>`,
        text: null,
        html,
        attachments,
      };

      const info = await smtpTransport.sendMail(mail, () => {
        smtpTransport.close();
      });

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log('ERROR SENDING EMAIL', error);
      return error;
    }
  }
}
