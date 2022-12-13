const blobService = require("../services/blobService");
const databaseService = require("../services/databaseService");

module.exports = async function (context, req) {
  const body = req.body;
  const userData = req.body.userData;

  if (body && userData) {
    try {
      const { container } = await databaseService.initDB();
      const user = await databaseService.createUser(container, userData);
      const containerResponse = await blobService.createContainer(user.id);
      context.res = {
        status: 200,
        body: {
          message: "User Registered Successfully",
          data: user,
          container: containerResponse,
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
