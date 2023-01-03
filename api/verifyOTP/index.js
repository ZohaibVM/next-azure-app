const blobService = require("../services/blobService");
const databaseService = require("../services/databaseService");

module.exports = async function (context, req) {
  const body = req.body;
  const userData = req.body.userData;

  if (body && userData) {
    try {
      const { usersContainer } = await databaseService.initDB();
      const userFromDB = await databaseService.isUserEmailExist(
        usersContainer,
        userData
      ); // find user with the email

      if (userFromDB) {
        // if user exists in DB match their OTP
        if (+userFromDB.otp === +userData.otp) {
          const updatedUser = { ...userFromDB, isActive: true };
          const userResponse = await databaseService.editResource(
            usersContainer,
            updatedUser
          ); // update user status 'isActive' to true in DB
          const containerResponse = await blobService.createContainer(
            userFromDB.id
          ); // create container based on userId

          context.res = {
            status: 200,
            body: {
              message: "User Register Successfully!",
              user: userResponse,
              container: containerResponse,
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
      body: "Please attach OTP & user email in the request body",
    };
  }
};
