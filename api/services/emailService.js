const nodemailer = require("nodemailer");
require("dotenv").config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

async function sendEmail(otp, userEmail) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "OTP verification Form Builder",
    text: "That was easy!",
    html: `<h1>Form Builder</h1><p>Your OTP is: ${otp}</p>`,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    return error;
  }

  //   return function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Email sent: " + info.response);
  //     }
  //   };
}

module.exports = {
  sendEmail,
};
