const blobService = require("../services/blobService");

module.exports = async function (context, req) {
  const body = req.body;
  const form = req.body.form;
  const user = req.body.user;

  if (body && form && user) {
    try {
      const message = await blobService.createNewBlob(form, user.id);
      context.res = {
        status: 200,
        body: {
          message,
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
      body: "Please attach form JSON object and UserID in the request body",
    };
  }
};
