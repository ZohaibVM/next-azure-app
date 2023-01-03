const databaseService = require("../services/databaseService");
const emailService = require("../services/emailService");
const utils = require("../utils/utils");

module.exports = async function (context, req) {
  const body = req.body;
  const email = req.body.email;

  if (body && email) {
    try {
      const { usersContainer } = await databaseService.initDB();
      let userFromDB = await databaseService.isUserEmailExist(usersContainer, {
        email,
      }); // find user with the email

      if (userFromDB) {
        // if user exists in DB match their OTP
        const otp = utils.generateRandomNumber(); // generate random number OTP
        const userEmailResponse = await emailService.sendEmail(otp, email); // send created OTP to user email
        userFromDB = { ...userFromDB, otp };
        const userOtpUpdateRes = await databaseService.editResource(
          usersContainer,
          userFromDB
        ); // replace previous otp with new generated OTP

        context.res = {
          status: 200,
          body: {
            message: "Check Your Email for OTP verification!",
            userOTP: userOtpUpdateRes,
            userEmail: userEmailResponse,
          },
        };
      } else {
        context.res = {
          status: 201,
          body: {
            message: "Your Email is not Registerd in Application",
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
      body: "Please attach user email in the request body",
    };
  }
};
