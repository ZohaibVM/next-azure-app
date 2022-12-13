const blobService = require("../services/blobService");

module.exports = async function (context, req, _) {
  const body = req.body;
  const user = req.body.user;

  try {
    if (body && user) {
      const formsData = await blobService.downloadBlobData(user.id);

      context.res = {
        status: 200,
        body: {
          forms: formsData,
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
