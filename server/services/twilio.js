// const twilio = require("twilio");
// require('dotenv').config();
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const sendSms = async () => {
//   try {
//     const message = await client.messages.create({
//       body: "Hello from Twilio!",
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: process.env.TEST_PHONE_NUMBER,
//     });
//     console.log(message);
//   } catch (error) {
//     console.log(error);
//   }
// };

// sendSms();
