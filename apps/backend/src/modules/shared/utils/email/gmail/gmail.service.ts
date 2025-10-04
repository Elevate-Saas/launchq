import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import {
  GMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
} from 'src/shared';
import { IEmailService } from '../abstract';
import { ISendEmail } from '../types';

export class GmailService implements IEmailService {
  async send(payload: ISendEmail): Promise<void> {
    const { toEmail, subject, html, attachments } = payload;
    try {
      const OAuth2 = google.auth.OAuth2;
      const oauth2Client = new OAuth2(
        GOOGLE_CLIENT_ID, // ClientID
        GOOGLE_CLIENT_SECRET, // Client Secret
        'https://developers.google.com/oauthplayground', // Redirect URL
      );
      oauth2Client.setCredentials({
        refresh_token: GOOGLE_REFRESH_TOKEN,
      });

      const accessToken = await oauth2Client.getAccessToken();
      const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: 'true',
        port: '465',
        auth: {
          type: 'OAuth2',
          user: GMAIL,
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          refreshToken: GOOGLE_REFRESH_TOKEN,
          accessToken: accessToken,
        },
        tls: {
          rejectUnauthorized: false,
          ciphers: 'SSLv3',
        },
      });

      const mail = {
        to: toEmail,
        subject: subject,
        from: `LaunchQ <${GMAIL}>`,
        text: null,
        html,
        attachments,
      };

      const info = smtpTransport.sendMail(mail, () => {
        smtpTransport.close();
      });

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
