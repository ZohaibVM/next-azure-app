const databaseService = require("../services/databaseService");

module.exports = async function (context, req) {
  const body = req.body;
  const formData = req.body.formData;

  if (body && formData) {
    try {
      const { submittedFormsContainer } = await databaseService.initDB();
      const message = await databaseService.createForm(
        submittedFormsContainer,
        formData
      ); // create form record;

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
      body: "Please attach form Data object in the request body",
    };
  }
};
