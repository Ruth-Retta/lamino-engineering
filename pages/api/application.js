import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { firstName, lastName, email, phoneNumber, position, experience, education } = req.body;

            const resume = req.files?.resume; 
            const coverLetter = req.files?.coverLetter; 

            
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER, 
                    pass: process.env.EMAIL_PASS, 
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'recipient@example.com', // Recipient's email address
                subject: `New Job Application for ${position}`,
                text: `
                    You have received a new job application.

                    Name: ${firstName} ${lastName}
                    Email: ${email}
                    Phone Number: ${phoneNumber}
                    Position: ${position}
                    Experience: ${experience}
                    Education: ${education}
                `,
                attachments: [
                    resume && {
                        filename: resume.originalname,
                        path: resume.path,
                    },
                    coverLetter && {
                        filename: coverLetter.originalname,
                        path: coverLetter.path,
                    },
                ].filter(Boolean), // Only include attachments if available
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'Application submitted successfully' });
        } catch (error) {
            console.error('Error processing application:', error);
            res.status(500).json({ message: 'Error processing application' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
