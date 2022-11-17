const blobService = require("../services/blobService");

module.exports = async function (context, req, _) {
  try {
    // const list = await blobService.getBlobs();
    const formsData = await blobService.downloadBlobData();
    context.log("FIRST ENV::::", process.env.AZURE_STORAGE_CONNECTION_STRING);
    context.log("SECOND ENV::::", process.env.AZURE_STORAGE_ACCOUNT_NAME);

    context.res = {
      status: 200,
      body: {
        // formList: list,
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
