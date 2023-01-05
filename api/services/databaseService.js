const { CosmosClient } = require("@azure/cosmos");
const users = require("./users.json");
const submissions = require("./form-submissions.json");
require("dotenv").config();

const key = process.env.COSMOS_KEY;
const endpoint = process.env.COSMOS_ENDPOINT;
const databaseName = `formbuilder_db_1670571268301`;
const userContainerName = `users_1670571268301`;
const submittedFormsContainerName = `submittedforms_1670571268301`;
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
  const { container: usersContainer } =
    await database.containers.createIfNotExists({
      id: userContainerName,
      // partitionKey: {
      //   paths: partitionKeyPath,
      // },
    });
  console.log(`${usersContainer.id} container ready`);

  const { container: submittedFormsContainer } =
    await database.containers.createIfNotExists({
      id: submittedFormsContainerName,
    });
  console.log(`${submittedFormsContainer.id} container ready`);

  return { usersContainer, submittedFormsContainer };
}

async function createUser(container, user) {
  const { resource } = await container.items.create(user);
  console.log(`'${resource.username}' inserted`);
  return resource;
}

async function createForm(container, data) {
  const { resource } = await container.items.create(data);
  console.log(`'${resource.id}' inserted`);
  return `${resource.id} inserted`;
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

async function findFormSubmissionsWithIds(container, data) {
  // Query by SQL - more expensive `find`
  // find all items with same categoryName (partitionKey)
  const querySpec = {
    query: "select * from items i where i.userId=@userId and i.formId=@formId",
    parameters: [
      {
        name: "@userId",
        value: data.id,
      },
      {
        name: "@formId",
        value: data.formId,
      },
    ],
  };

  // Get items
  const { resources } = await container.items.query(querySpec).fetchAll();
  return resources;
  // for (const item of resources) {
  //   console.log(
  //     `${item.id}: ${item.username}, ${item.email}, ${item.password}`
  //   );
  // }
}

async function deleteFormSubmissions(container, data) {
  const submissions = await findFormSubmissionsWithIds(container, data); // find respective forms
  const responses = [];
  for (const form of submissions) {
    const { statusCode } = await container.item(form.id, undefined).delete(); // delete them one by one
    if (statusCode == 204) {
      console.log(`Form deleted`);
      responses.push("Form deleted");
    } else {
      console.log(`Form not deleted`);
      responses.push("Form not deleted");
    }
  }

  if (responses.length) {
    const res = responses.every((res) => res === "Form deleted");

    if (res) {
      return "All Form Submissions Deleted";
    }

    return "All Form Submissions Not Deleted";
  }

  return "No submission found";
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

async function isUserEmailExist(container, user) {
  const querySpec = {
    query: "select * from items i where i.email=@email",
    parameters: [
      {
        name: "@email",
        value: user.email,
      },
    ],
  };

  // Get items
  const { resources } = await container.items.query(querySpec).fetchAll();
  return resources[0];
}

async function isUserExist(container, user) {
  const querySpec = {
    query: "select * from items i where i.username=@userName",
    parameters: [
      {
        name: "@userName",
        value: user.username,
      },
    ],
  };

  // Get items
  const { resources } = await container.items.query(querySpec).fetchAll();
  return resources[0];
}

async function editResource(container, user) {
  const { resource: updatedUser } = await container.items.upsert(user);
  return `${updatedUser.username} updated`;

  // const user = { ...users[0] };
  // user.username = "zohaib ashraf";
  // const { resource: updatedUser } = await container.items.upsert(
  //   user,
  //   users[0].id
  // );
  // console.log(updatedUser.username, "updated");
}

module.exports = {
  initDB,
  readAll,
  createUser,
  createForm,
  isUserExist,
  editResource,
  findResource,
  findAllResources,
  findFormSubmissionsWithIds,
  deleteResource,
  deleteFormSubmissions,
  isUserEmailExist,
};

const createResources = async (container) => {
  // Create all users
  for (const user of users) {
    const { resource } = await container.items.create(user);
    console.log(`'${resource.username}' inserted`);
  }
};
