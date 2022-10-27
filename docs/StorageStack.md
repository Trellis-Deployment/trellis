# Storage

## Working with Dynamodb

- Created a util function called `dynamodb` that has the following information

```js
import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};
```

- Whenever you need to use the dynamodb, import this module into the module where you want to use the tables

### get

With get, you need to specify a key that represents the `primaryIndex` of the table. It returns one item that matches the key values.

```js
const params = {
  TableName: process.env.USERS_TABLE_NAME,
  Key: {
    login: login,
  },
};

const result = await dynamodb.get(params);

return result.Item; // Returns the item with all of its attributes
```

### put

Specify a new `row` for the column with the required attributes and call it with the method.

```js
const newUser = {
  login: "melchanti",
  userName: "Mohamad EL-Chanti" || "not submitted",
  email: "elchantimo@gmail.com" || "not submitted",
  userToken: "sfsdfkj890sjskjfdjsfd80sf",
  refreshToken: "sdfsfds98f98sfd9sfdjsf8sdf9sdf98sf",
};

const params = {
  TableName: process.env.USERS_TABLE_NAME,
  Item: newUser,
};
await dynamodb.put(params);

return params.Item;
```

### Query

Create an object with the following properties:

- `TableName`
- `KeyConditionExpression` The attribute with the attribute value you are looking for
- `ExpressionAttributeValues` The values corresponding to the value of the attributes:w

```js
const getAppsByOwner = async (login) => {
  const params = {
    TableName: process.env.APPS_TABLE_NAME,
    KeyConditionExpression: "ownerLogin = :ownerLogin",
    ExpressionAttributeValues: {
      ":ownerLogin": login,
    },
  };

  const result = await dynamodb.query(params);

  return result.Items;
};
```

### Update

```js
const updateUser = async (tokenObject) => {
  const putParams = {
    TableName: process.env.USERS_TABLE_NAME,
    Key: {
      login: data.login,
    },
    UpdateExpression: "SET userToken = :userToken",
    ExpressionAttributeValues: {
      ":userToken": tokenObject.access_token,
    },
  };
  await dynamodb.update(putParams);
};
```

### Delete

Not yet completed

## Tables

We have four tables, below is their schemas.

### Users

```js
const users = new Table(stack, "TrellisUsersList", {
  fields: {
    userId: "string",
    githubLogin: "string",
    email: "string",
    githubFullName: "string",
    userToken: "string",
    githubAvatarUrl: "string",
  },
  primaryIndex: { partitionKey: "userId", sortKey: "login" },
});
```

### Apps

```js
const apps = new Table(stack, "TrellisAppsList", {
  fields: {
    appId: "string",
    appName: "string",
    userId: "string",
    description: "string",
    repoName: "string",
    defaultIAMAccessKey: "string",
    defaultIAMSecretKey: "string",
  },
  primaryIndex: { partitionKey: "ownerLogin", sortKey: "appName" },
});
```

### Stages

```js
const stages = new Table(stack, "TrellisAppsList", {
  fields: {
     stageId: "string",
     appId: "string",
     stageName: "string",
     IAMAccessKey: "string",
     IAMSecretKey: "string",
     stageBranch: "string",
     stageState: "string",
     lastCommitId: "string",
     lastDeploymentTime: "number",
     },
     primaryIndex: { partitionKey: "appId", sortKey: "stageName" },
```

### Deployments

```js
const deployments = new Table(deployments, "TrellisAppsList", {
  fields: {
       deploymentId: "string",
       stageId: "string",
       commitId: "string",
       logs: "string",
       deploymentState: "string",
       time: "number"
     },
     primaryIndex: { partitionKey: "stageId", sortKey: "stageId" },
```
