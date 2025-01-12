// import { createTransport } from 'nodemailer';

// const transporter = createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN
//   }
// });

// const sendJobPostingDeniedEmail = (employerEmail, jobTitle) => {
//   const mailOptions = {
//     from: 'rooseveltrecruit@gmail.com',
//     to: employerEmail,
//     subject: 'Job Posting Denied',
//     text: `Dear Employer,

// We regret to inform you that your job posting for the position of "${jobTitle}" has been denied.

// Thank you for your understanding.

// Best regards,
// Your Company Name`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// export default sendJobPostingDeniedEmail;