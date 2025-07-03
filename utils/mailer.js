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

    const documentLink = `http://localhost:3000/editor/${docId}`;

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Document Share</title></head>
    <body style="margin:0;padding:0;font-family:'Segoe UI',sans-serif;background-color:#f5f7fa;">
      <table width="100%" bgcolor="#f5f7fa" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.05);overflow:hidden;">
              <tr>
                <td bgcolor="#111827" style="padding:20px 30px;color:white;font-size:20px;font-weight:600;">
                  Real-Time Document Editor
                </td>
              </tr>
              <tr>
                <td style="padding:30px;color:#333;">
                  <h2 style="margin-top:0;">You've been invited to collaborate</h2>
                  <p style="font-size:15px;">Hello,</p>
                  <p style="font-size:15px;">You’ve been invited to collaborate on a document.</p>
                  <div style="margin:20px 0;padding:15px;background-color:#f0f4f8;border-left:4px solid #2563eb;">
                    <strong>Document ID:</strong> ${docId}<br/>
                    <strong>Link:</strong> <a href="${documentLink}">${documentLink}</a>
                  </div>
                  <p style="font-size:15px;">Click the button below to open it:</p>
                  <div style="text-align:center;margin:30px 0;">
                    <a href="${documentLink}" style="padding:12px 24px;background-color:#2563eb;color:white;text-decoration:none;border-radius:6px;font-weight:500;">
                      Open Document
                    </a>
                  </div>
                  <p style="font-size:13px;color:#666;">If you didn’t expect this email, you can ignore it.</p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#f9fafb" style="padding:20px 30px;font-size:12px;color:#999;text-align:center;">
                  &copy; 2025 Real-Time Document Editor. Built by Ayyan.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    const mailOptions = {
      from: `"Document Editor" <${process.env.EMAIL_USER}>`,
      to,
      subject: '📄 Document Shared With You',
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
};

module.exports = sendShareEmail;
