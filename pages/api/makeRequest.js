import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, 
  },
};

const sendEmail = async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const { name, email, phoneNumber, subject, description, materials } = fields;
      const attachments = files.attachments;

      
      const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS, 
        },
      });

      
      let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, 
        subject: `New Request: ${subject}`,
        text: `You have received a new request. Here are the details:\n\n
               Name/Company: ${name}\n
               Email: ${email}\n
               Phone Number: ${phoneNumber}\n
               Request Subject: ${subject}\n
               Description: ${description}\n
               List of Materials: ${materials}`,
      };

      
      if (attachments) {
        const attachmentPath = path.join(process.cwd(), 'uploads', attachments.newFilename);
        fs.renameSync(attachments.filepath, attachmentPath);
        
        mailOptions.attachments = [
          {
            filename: attachments.originalFilename,
            path: attachmentPath,
          },
        ];
      }

      try {
        
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Request sent successfully!' });
      } catch (error) {
        return res.status(500).json({ error: 'Error sending email' });
      }
    });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default sendEmail;
