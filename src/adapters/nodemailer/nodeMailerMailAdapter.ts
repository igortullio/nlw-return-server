import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from '../mailAdapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2834fd36e90635',
    pass: '491f186b01ac21',
  },
})

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedback <oi@feedback.com>',
      to: 'Igor Túllio <igortullio@hotmail.com>',
      subject,
      html: body,
    })
  }
}
