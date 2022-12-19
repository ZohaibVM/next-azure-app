const blobService = require("../services/blobService");
const databaseService = require("../services/databaseService");

module.exports = async function (context, req) {
  const body = req.body;
  const userData = req.body.userData;

  if (body && userData) {
    try {
      const { container } = await databaseService.initDB();
      const userFromDB = await databaseService.isUserExist(container, userData);

      // if username not exist in DB
      if (!userFromDB) {
        context.res = {
          status: 201,
          body: {
            message: "User is Not Registered!",
          },
        };
        return;
      }

      // if user exist and its password matched
      if (userFromDB.password === userData.password) {
        const { password, ...userWithoutPassword } = userFromDB || {};
        context.res = {
          status: 200,
          body: {
            user: userFromDB && userWithoutPassword,
            message: userFromDB
              ? "User Login Successfully"
              : "User is Not Registered!",
          },
        };
      }

      // if user exist and its password not matched
      if (userFromDB.password !== userData.password) {
        context.res = {
          status: 201,
          body: {
            message: "User Password is Incorrect!",
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
