# Github

This is the first prototype that we will use seed to deploy to better understand the benefits of seed

## Steps needed to get the access token from github

- Direct the client to the below url to get a temporary code or redirect it to the Github app to install and authroize.
  `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_Client_ID}`
  `https://github.com/apps/dobbygit/installations/new`
- After the client authorizes the Github app, the above url will redirect to your redirect url with a temporary code provided in the parameters, it'll look something like the below:
  `http://${Your_REDIRECT_URL}?code=${Temporary_CODE}`
- Use the temporary code from above to make a request to the following url to get the access token.
  `https://github.com/login/oauth/access_token?client_id=${config.Client_ID}&client_secret=${config.Client_secret}&code=${code}`
  The `Client_ID` and the `Client_secret` will be on the github app page in the settings.
- The above request will respond with an access-token provided in the body.
  ```json
  {
    "access_token": "ghu_16C7e42F292c6912E7710c838347Ae178B4a",
    "expires_in": 28800,
    "refresh_token": "ghr_1B4a2e77838347a7E420ce178F2E7c6912E169246c34E1ccbF66C46812d16D5B1A9Dc86A1498",
    "refresh_token_expires_in": 15811200,
    "scope": "",
    "token_type": "bearer"
  }
  ```

## Steps needed to get the repos of the user

- `import { Octokit } from "octokit";`
- Create a new `Octokit` object with the access token and make a request to `Get /user`
  ```js
  const octokit = new Octokit({
    auth: token
  });
  try {
    const response = await octokit.request('Get /user', {});
    return response.data;
  }
  ```
- Once you have the user login, make a request to the below link.
  ```js
  const response = await octokit.request("Get /user/repos", {});
  return response.data;
  ```

## Steps needed to clone the repo

```js
const buildRepo = async (user, repo) => {
  const path = "~/Documents/lsProjects/Capstone/Dobby";
  const token = await getTokenByUser(user);

  shell.cd(path);
  shell.exec(
    `git clone https://x-access-token:${token}@"github.com/${user}/${repo}.git"`
  );
};
```

## Steps needed to create a webhook url

- `import { Octokit } from "octokit";`
- Create a new `Octokit` object with the access token and make a request to `POST /repos/{owner}/{repo}/hooks`

  ```js
  const octokit = new Octokit({
    auth: token,
  });

  const response = await octokit.request("POST /repos/{owner}/{repo}/hooks", {
    owner: owner,
    repo: repo,
    name: "web",
    active: true,
    events: ["push"],
    config: {
      url: webhookURL,
      content_type: "json",
      insecure_ssl: "0",
    },
  });
  ```

<!-- TODO: finish this? -->

- The response of the url will be
