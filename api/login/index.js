const blobService = require("../services/blobService");
const databaseService = require("../services/databaseService");

module.exports = async function (context, req) {
  const body = req.body;
  const userData = req.body.userData;

  if (body && userData) {
    try {
      const { container } = await databaseService.initDB();
      const user = await databaseService.findAllResources(container, userData);
      const { password, ...userWithoutPassword } = user || {};
      context.res = {
        status: 200,
        body: {
          message: user ? "User Login Successfully" : "User is Not Registered!",
          user: user && userWithoutPassword,
        },
      };
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
