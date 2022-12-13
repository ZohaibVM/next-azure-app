const blobService = require("../services/blobService");

module.exports = async function (context, req) {
  const body = req.body;
  const user = req.body.user;
  const formId = context.req.params.id;

  if (formId && body && user) {
    try {
      const message = await blobService.deleteBlob(`${formId}.txt`, user.id);
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
