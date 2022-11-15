const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");
const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

async function createNewBlob(formData) {
  try {
    const blobServiceClient = getBlobServiceClient();
    const res = await createAndUploadBlobData(formData, blobServiceClient);
    return res;
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

async function getBlobs() {
  try {
    const blobServiceClient = getBlobServiceClient();
    const names = await listBlobsInContainer(blobServiceClient);
    return names;
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

async function downloadBlobData() {
  try {
    const blobServiceClient = getBlobServiceClient();
    const blobs = await listBlobsInContainer(blobServiceClient);

    const containerClient = blobServiceClient.getContainerClient(
      getContainerName()
    );

    const blobServiceClientList = [];

    for await (const blob of blobs) {
      const blockBlobClient = containerClient.getBlockBlobClient(blob);
      blobServiceClientList.push(blockBlobClient);
    }

    const formData = [];
    for await (const blockBlobClient of blobServiceClientList) {
      const downloadBlockBlobResponse = await blockBlobClient.download();
      const data = await streamToText(
        downloadBlockBlobResponse.readableStreamBody
      );
      formData.push(JSON.parse(data));
    }

    return formData;

    // Get a block blob client
    // const blockBlobClient = containerClient.getBlockBlobClient(
    //   "formsd67569e0-6425-11ed-9cda-b501318052a6.txt"
    // );
    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    // const downloadBlockBlobResponse = await blockBlobClient.download();
    // console.log("\nDownloaded blob content...");
    // console.log(
    //   "\t",
    //   await streamToText(downloadBlockBlobResponse.readableStreamBody)
    // );
    // const data = await streamToText(
    //   downloadBlockBlobResponse.readableStreamBody
    // );
    // return data;
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

module.exports = {
  createNewBlob,
  getBlobs,
  downloadBlobData,
};

function getBlobServiceClient() {
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  if (!accountName) throw Error("Azure Storage accountName not found");

  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential()
  );
  return blobServiceClient;
}

// Create Container
async function createContainer(blobServiceClient) {
  // Create a unique name for the container
  const containerName = "formscontainer" + uuidv1();

  console.log("\nCreating container...");
  console.log("\t", containerName);

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);
  // Create the container
  const createContainerResponse = await containerClient.create();
  return `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`;
}

// Create blob and upload data in blob
async function createAndUploadBlobData(formData, blobServiceClient) {
  const containerClient = blobServiceClient.getContainerClient(
    getContainerName()
  );
  // Create a unique name for the blob
  const blobName = "forms" + uuidv1() + ".txt";

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Display blob name and url
  console.log(
    `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
  );

  // Upload data to the blob
  const uploadBlobResponse = await blockBlobClient.upload(
    JSON.stringify(formData),
    JSON.stringify(formData).length
  );

  return `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`;
}

// List blobs in container
async function listBlobsInContainer(blobServiceClient) {
  console.log("\nListing blobs...");
  const containerClient = blobServiceClient.getContainerClient(
    getContainerName()
  );
  let blobNames = [];
  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    // Get Blob Client from name, to get the URL
    // const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
    // Display blob name and URL
    // console.log(`\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`);
    blobNames.push(blob.name);
  }

  return blobNames;
}

function getContainerName() {
  return "formscontainer93993e00-6423-11ed-aa80-91c0503ad210";
}

// Delete Container
async function deleteContainer() {
  // Delete container
  console.log("\nDeleting container...");

  const deleteContainerResponse = await containerClient.delete();
  console.log(
    "Container was deleted successfully. requestId: ",
    deleteContainerResponse.requestId
  );
}

// List all containers
async function listContainers(blobServiceClient) {
  let i = 1;
  let containerNames = [];
  let containers = blobServiceClient.listContainers();
  for await (const container of containers) {
    console.log(`Container ${i++}: ${container.name}`);
    containerNames.push(container.name);
  }
  return containerNames;
}

// Convert stream to text
async function streamToText(readable) {
  readable.setEncoding("utf8");
  let data = "";
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}
