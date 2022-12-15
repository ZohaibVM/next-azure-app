const databaseService = require("../services/databaseService");

module.exports = async function (context, req) {
  const body = req.body;
  const userData = req.body.userData;

  if (body && userData) {
    try {
      const { container } = await databaseService.initDB();
      const userFromDB = await databaseService.isUserEmailExist(
        container,
        userData
      ); // find user with the email

      if (userFromDB) {
        // if user exists in DB match their OTP
        if (+userFromDB.otp === +userData.otp) {
          context.res = {
            status: 200,
            body: {
              message: "OTP is Verified! Please Update your password",
            },
          };
        } else {
          // if OTP is not valid
          context.res = {
            status: 201,
            body: {
              message: "Your OTP is not Valid! Try Again",
            },
          };
        }
      } else {
        context.res = {
          status: 201,
          body: {
            message: "Your Email is not Valid",
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
