const blobService = require("../services/blobService");
const databaseService = require("../services/databaseService");

module.exports = async function (context, req) {
  const body = req.body;
  const user = req.body.user;
  const formId = context.req.params.id;

  if (formId && body && user) {
    try {
      const message = await blobService.deleteBlob(`${formId}.txt`, user.id); // delete blob
      const { submittedFormsContainer } = await databaseService.initDB();
      const response = await databaseService.deleteFormSubmissions(
        submittedFormsContainer,
        {
          ...user,
          formId,
        }
      ); // delete records from DB

      context.res = {
        status: 200,
        body: {
          message,
          response,
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
