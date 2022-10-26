# Api Endpoints

- "GET /authenticate" - Not used anymore
- "GET /signup"
  - Receives a url paramater named `code`
  - Adds the github user corresponding to the code to the `users` table
  - Returns the github `login` from the code provided
- "GET /signin"
  - Receives a url paramater named `code`
  - Updates the github user token in the `users` table
  - Return the github `login` from the code provided
- "GET /repos"
  - Receives a url parameter named `user`
  - Gets the repos that the user has access to from github that have the Github app downloaded and stores them in the `repos` table
  - Returns the list of repos as an array of repo names in the format `/user/repo/`
- "GET /apps"
  - Receives a url paramter named `user`
  - Gets the list of apps for that user and returns the apps in an array in the format
  ```json
  {
    "appId": "string",
    "appName": "string",
    "ownerLogin": "string",
    "appState": "string",
    "description": "string",
    "repo": "string",
    "IAMAccessKey": "string",
    "IAMSecretKey": "string"
  }
  ```
- "GET /stages"
  - Receives two url paramaters named `user` and `appName`
  - Gets the list of stages for the specific app in an array in teh format
  ```json
  {
    "stageId": "string",
    "stageName": "string",
    "appId": "string",
    "IAMAccessKey": "string",
    "IAMSecretKey": "string",
    "stageBranch": "string",
    "stageState": "string"
  }
  ```
- "POST /apps"
  - Accepts a json format of an a new app in the format
  ```json
  {
    "name": "string",
    "user": "string",
    "description": "string",
    "repo": "string",
    "accessKey": "string",
    "secretKey": "string"
  }
  ```
  - Adds the app to the database
  - Creates a webhook for the repo
  -
- "POST /webhook"
  - Listens to github webhooks
