# Installation

1. Clone the project - `git clone https://github.com/Trellis-Deployment/trellis.git`
1. Create a github app to interact with trellis
   1. Sign into github.com
   1. Settings --> Developer Settings [link](https://github.com/settings/apps)
   1. Go to GitHub Apps --> New GitHub App
   1. Name the app (we suggest including the word Trellis)
   1. Put any name in the Homepage URL field
   1. Check `Request user authorization (OAuth) during installation`
   1. Check 'Enable Device Flow'
   1. We will be returning here to fill out the callback and setup URLs
   1. Permissions - set the following to `Read and Write`
      - Actions
      - Administration
      - Checks
      - Codespaces Metadata
      - Commit statuses
      - Metadata
      - Pull Requests
      - Webhooks
   1. 'Where can this GitHub app be installed?' - select 'Any account'
   1. Click 'Create GitHub App'
   1. In the `.env` file in the trellis directory, copy the following information from your github app
      - App name
      - ClientId
   1. Click on 'Generate a new client secret'
      - Copy this secret into your .env file
1. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html) and [configure your credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) - these are used to deploy Trellis on your AWS account
1. Install the package dependencies - `cd trellis` and `npm install`
1. Now install packages in the client directory - `cd client` and `npm install`
1. Next we need to locally build and push a docker image to ECR - the name of this image is hard-coded into the build-server task
   1. In `docker-container` is a script build and image and loads it to AWS ECR. The script loads for your 12 digit AWS number from the .env file. You must execute the script from the `docker-container` directory
   1. The `.env` file also allows you to specify the region - default is `us-east-1`
   1. Make the `/docker-container/build-and-push-to-aws.sh` executable with `chmod a+rx build-and-push-to-aws.sh`
   1. run `./build-and-push-to-aws.sh`
   1. If you like, go to ECR in the AWS console and verify the container exists
1. Run `npx sst deploy` from the root directory of the project.
1. Copy the site URL that is logged during the deploy
   - Copy this url into the Callback URL and append `/gitRedirect`
   - Copy this url into the Setup URL and select `Redirect on update`
