const { UserModel } = require("../models/Schema");
const { hashPassword, generateAuthToken } = require("../utils/keys");
const nodemailer = require("nodemailer");

const registeredUserNodemailer = async (user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.TEST_EMAIL,
      pass: process.env.TEST_PASSWORD,
    },
  });
  const dateFormatter = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };
  const mailOptions = {
    from: `One Comfort Associations`,
    to: process.env.TEST_EMAIL,
    subject: `🎯 New user has been registered: ${user.firstname}`,
    html: `
      <h1>
      New user data: 
      </h1>
      <div>
      <ul>
      <li>
     FULLNAME: ${user.firstname} ${user.lastname} 
      </li>
      <li>
      EMAIL: ${user.email}
      </li>
      <li>
      PHONE: ${user.phone}
      </li>
      <li>
      DATE: ${dateFormatter(Date.now())}
      </li>
      </ul>
      </div>
      `,
  };

  transporter.sendMail(mailOptions);

  return mailOptions;
};

module.exports = {
  registeredUserNodemailer,
};
