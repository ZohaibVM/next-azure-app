const blobService = require("../services/blobService");

module.exports = async function (context, req, _) {
  try {
    const formsData = await blobService.downloadBlobData();

    context.res = {
      status: 200,
      body: {
        forms: formsData,
      },
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error,
    };
  }
};
