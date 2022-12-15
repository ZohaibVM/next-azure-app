const blobService = require("../services/blobService");
const databaseService = require("../services/databaseService");
const utils = require("../utils/utils");
const emailService = require("../services/emailService");

module.exports = async function (context, req) {
  const body = req.body;
  const userData = req.body.userData;

  if (body && userData) {
    try {
      const { container } = await databaseService.initDB();
      const user = await databaseService.isUserEmailExist(container, userData);

      // if user email not exist then create
      if (!user) {
        const otp = utils.generateRandomNumber(); // generate random number OTP
        const newUserData = { ...userData, otp }; // add OTP in user body
        const user = await databaseService.createUser(container, newUserData); // create user with 'otp'
        const emailResponse = await emailService.sendEmail(otp, userData.email); // send created OTP to user email

        context.res = {
          status: 200,
          body: {
            message: "Please Verify OTP",
            // data: user,
            email: emailResponse,
          },
        };
      } else {
        context.res = {
          status: 201,
          body: {
            message: "Email Already Exist",
          },
        };
      }
    } catch (error) {
      context.res = {
        status: 500,
        body: error,
      };
    }
  } else {
    context.res = {
      status: 400,
      body: "Please attach signup info in the request body",
    };
  }
};
