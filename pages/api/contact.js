import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phoneNumber, subject, message } = req.body;

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use other services like Mailgun, SendGrid, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: email, // The user's email
      to: process.env.EMAIL_USER, // The email you want to send the form data to
      subject: `Contact form submission: ${subject}`,
      text: `
        You have a new contact form submission from your website:

        Name: ${name}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email: ', error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
