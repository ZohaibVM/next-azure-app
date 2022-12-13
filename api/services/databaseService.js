const { CosmosClient } = require("@azure/cosmos");
const users = require("./users.json");
require("dotenv").config();
const key = process.env.COSMOS_KEY;
const endpoint = process.env.COSMOS_ENDPOINT;
const databaseName = `formbuilder_db_1670571268301`;
const containerName = `users_1670571268301`;
const partitionKeyPath = ["/id"];

// Uniqueness for database and container
// const timeStamp = +new Date();
// Set Database name and container name with unique timestamp
// const databaseName = `formbuilder_db_${timeStamp}`;
// const containerName = `users_${timeStamp}`;
// const partitionKeyPath = ["/id"];

// Authenticate to Azure Cosmos DB
const cosmosClient = new CosmosClient({ endpoint, key });

async function initDB() {
  // Create database if it doesn't exist
  const { database } = await cosmosClient.databases.createIfNotExists({
    id: databaseName,
  });
  console.log(`${database.id} database ready`);

  // Create container if it doesn't exist
  const { container } = await database.containers.createIfNotExists({
    id: containerName,
    // partitionKey: {
    //   paths: partitionKeyPath,
    // },
  });
  console.log(`${container.id} container ready`);

  return { container };
}

async function createUser(container, user) {
  const { resource } = await container.items.create(user);
  console.log(`'${resource.username}' inserted`);
  return resource;
}

async function deleteResource(container) {
  // Delete item
  //   const { statusCode } = await container
  //     .item(items[2].id, items[2].categoryName)
  //     .delete();
  //   console.log(
  //     `${items[2].id} ${statusCode == 204 ? `Item deleted` : `Item not deleted`}`
  //   );

  for (const user of users) {
    const { statusCode } = await container.item(user.id, user.id).delete();
    console.log(
      `${user.username} ${
        statusCode == 204 ? `Item deleted` : `Item not deleted`
      }`
    );
  }
}

async function findResource(container, user) {
  // Read item by id and partitionKey - least expensive `find`
  const { resource } = await container
    .item("75f5a0f0-5cc1-44dd-b5c2-81d9aff33d9b", undefined)
    .read();
  console.log(`${resource} full resource`);
  console.log(`${resource.username} read`);
  return resource;
}

async function readAll(container) {
  const { resources } = await container.items.readAll().fetchAll();
  return resources;
}

async function findAllResources(container, user) {
  // Query by SQL - more expensive `find`
  // find all items with same categoryName (partitionKey)
  const querySpec = {
    query:
      "select * from items i where i.username=@userName and i.password=@userPassword",
    parameters: [
      {
        name: "@userName",
        value: user.username,
      },
      {
        name: "@userPassword",
        value: user.password,
      },
    ],
  };

  // Get items
  const { resources } = await container.items.query(querySpec).fetchAll();
  return resources[0];
  // for (const item of resources) {
  //   console.log(
  //     `${item.id}: ${item.username}, ${item.email}, ${item.password}`
  //   );
  // }
}

module.exports = {
  initDB,
  readAll,
  createUser,
  findResource,
  findAllResources,
  deleteResource,
};

const createResources = async (container) => {
  // Create all users
  for (const user of users) {
    const { resource } = await container.items.create(user);
    console.log(`'${resource.username}' inserted`);
  }
};

const editResource = async (container) => {
  const user = { ...users[0] };
  user.username = "zohaib ashraf";
  const { resource: updatedUser } = await container.items.upsert(
    user,
    users[0].id
  );
  console.log(updatedUser.username, "updated");
};
