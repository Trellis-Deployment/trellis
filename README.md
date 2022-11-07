# Installation

<details>
<summary>Clone Trellis</summary>

1. `git clone https://github.com/Trellis-Deployment/trellis.git`
1. Enter the cloned directory and rename the `.env.template` to `.env`
   - `cd trellis`
   - `mv .env.template .env`
1. Install the package dependencies
   - `npm install`

</details>
<details>

<summary> Create a GitHub app </summary>

1. Create a GitHub app to interact with trellis

   1. Sign into github.com
   1. Settings --> Developer Settings [link](https://github.com/settings/apps)
   1. Go to GitHub Apps --> New GitHub App
   1. Name the app (we suggest including the word Trellis)
   1. Put any name in the Homepage URL field
   1. Check `Request user authorization (OAuth) during installation`
   1. Check 'Enable Device Flow'
   1. We will be returning here to fill out the callback and setup URLs
   1. Permissions
      - Repository Permissions
        - Checks - Read and Write
        - Commit statuses - Read and Write
        - Contents - Read
        - Deployments - Read and Write
        - Metadata - Read
        - Pull Requests - Read and Write
        - Webhooks - Read and Write
      - Account Permissions
        - Email addresses - Read
   1. 'Where can this GitHub app be installed?' - select 'Any account'
   1. Click 'Create GitHub App'
   1. In the `.env` file in the trellis directory, copy the following information from your GitHub app
      - App name
      - ClientId
   1. Click on 'Generate a new client secret' - Copy this secret into your .env file

</details>

<details>
<summary> Install the AWS CLI </summary>

1. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html) and [configure your credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) - these are used to deploy Trellis on your AWS account

</details>

<details>
<summary>Push the build server docker image to ECR</summary>

1. Next we need to locally build the docker image used to run deployments and push it to ECR
1. In the `docker-container` directory there is a script called `build-and-push-to-aws.sh` that will build an image and load it to AWS ECR.
1. The script uses the AWS CLI to get your AWS account number, and defaults to the region 'us-east-1' - change these values in the script if you so desire
1. Make the `/docker-container/build-and-push-to-aws.sh` executable with `chmod a+rx build-and-push-to-aws.sh`
1. run `./build-and-push-to-aws.sh`
1. If you like, go to ECR in the AWS console and verify the container exists

</details>

<details>
<summary>Deploy Trellis</summary>

1. Return to the root directory of the project, then run `npx sst deploy` to deploy Trellis on your AWS infrastructure
1. Copy the site URL that is logged during the deploy - return to the GitHub app settings from earlier
   - Copy this url into the Callback URL and append `/gitRedirect`
   - Copy this url into the Setup URL and select `Redirect on update`

</details>
