const databaseService = require("../services/databaseService");

module.exports = async function (context, req) {
  const body = req.body;
  let userData = req.body.userData;

  if (body && userData) {
    try {
      const { container } = await databaseService.initDB();
      let userFromDB = await databaseService.isUserEmailExist(
        container,
        userData
      ); // find user with the email

      if (userFromDB) {
        // if user exists in DB match their OTP
        userFromDB = { ...userFromDB, password: userData.password };
        const userPassUpdateRes = await databaseService.editResource(
          container,
          userFromDB
        ); // replace previous otp with new generated OTP

        context.res = {
          status: 200,
          body: {
            message: "User Password is updated Successfully! Please Login",
            userMessage: userPassUpdateRes,
          },
        };
      } else {
        context.res = {
          status: 201,
          body: {
            message: "This User is not Registerd in Application",
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
      body: "Please attach email and password in the request body",
    };
  }
};
