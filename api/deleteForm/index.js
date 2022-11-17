const blobService = require("../services/blobService");

module.exports = async function (context, req) {
  //   const body = req.body;
  const formId = context.req.params.id;

  if (formId) {
    try {
      const message = await blobService.deleteBlob(`${formId}.txt`);
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
