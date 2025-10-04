export type ISendEmail = {
  fromEmail?: string;
  fromName?: string;
  fromPassword?: string;
  secure?: boolean;
  tls?: Record<string, any>;
  host?: string;
  port?: string;
  toEmail: string;
  toName?: string;
  templateId?: string;
  subject: string;
  variables?: Record<string, any>;
  html?: string;
  attachments?: IEmailAttachment[];
};

export type IEmailAttachment = {
  filename: string;
  content: any;
  encoding?: string;
  cid?: string;
};
