import { createTransport } from 'nodemailer'
class MailSender {
        private transporter = createTransport({
          host: process.env.MAIL_SERVER,
          port: process.env.MAIL_PORT as unknown as number,
          secure: true,
          auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD
          }
        });

        sendEmail (targetEmail: string, content: string) {
          const message = {
            from: 'Music Apps',
            to: targetEmail,
            subject: 'Playlist Export',
            text: 'This is the data you requested',
            attachments: [{
              filename: 'playlist.json',
              content
            }]
          }

          return this.transporter.sendMail(message)
        }
}

export default MailSender
