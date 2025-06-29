// utils/mailer.js
const nodemailer = require('nodemailer');

const sendShareEmail = async (to, docId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Document Shared With You 📝',
      html: `
        <p>Hello!</p>
        <p>You’ve been invited to collaborate on a document.</p>
        <p><a href="http://localhost:3000/editor/${docId}">Click here to open the document</a></p>
        <br/>
        <p>— Google Docs Clone Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};

module.exports = sendShareEmail;
