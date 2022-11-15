const blobService = require("../services/blobService");

module.exports = async function (context, req) {
  if (req.body && req.body.form) {
    try {
      const list = await blobService.createNewBlob(req.body.form);
      context.res = {
        status: 200,
        body: {
          data: list,
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
