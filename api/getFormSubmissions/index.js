// const blobService = require("../services/blobService");
const databaseService = require("../services/databaseService");

module.exports = async function (context, req, _) {
  const body = req.body;
  const user = req.body.user;

  try {
    if (body && user) {
      const { submittedFormsContainer } = await databaseService.initDB();
      const formsData = await databaseService.findFormSubmissionsWithIds(
        submittedFormsContainer,
        user
      ); // get forms of loggedin user with particular formId;

      context.res = {
        status: 200,
        body: {
          formsData,
        },
      };
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: error,
    };
  }
};
