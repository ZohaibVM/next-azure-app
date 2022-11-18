const blobService = require("../services/blobService");

module.exports = async function (context, req) {
  const body = req.body;
  const form = req.body.form;

  if (body && form) {
    try {
      const message = await blobService.createNewBlob(form);
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
      body: "Please attach form JSON object in the request body",
    };
  }
};
