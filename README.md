![Trellis-logo](https://trellis-deployment.github.io/images/logo/logo-name.svg)

# Trellis

> An open-source deployment pipeline tool built for serverless applications

Trellis is built to give teams a low-configuration deployment pipeline for their serverless applications which are deployed to AWS. Trellis itself is a serverless application, deployed on the users's own AWS infrastructure. Trellis handles the provisioning and management of development, staging and production environments for serverless applications.

Find more about the details of Trellis by reading our <a href = "https://trellis-deployment.github.io/" target="_blank">case study<a/>

## Features

- Trellis provisions deployment environments for serverless applications built on AWS
- Deployment environments can be automatically provisioned from commits to connected GitHub branches
- Code is promoted to staging and production environments manually, and can be rolled back as well
- Trellis provides a dashboard for managaing deployment pipelines

## How Trellis Works

Trellis is itself a serverless application, and can be deployed to AWS with a single command. Users then create a Trellis application and connect it to their target GitHub repository. Trellis is composed of a React dashboard, a backend mostly composed of AWS Lambda functions and an on-demand build server run using AWS Elastic Container Service.

A webhook is registered on the target GitHub repository. Commits to that repository trigger the provision of an ephemeral build server which deploys the users application on AWS infrastructure. Users can log in to the Trellis dashboard to view the state of their deployments, or to trigger manual promotions, rollbacks or teardowns of deployment environments.

## Technology

- AWS CDK and SDK
- Serverless Stack (SST) Framework
- AWS Lambda, ECS, Fargate, DynamoDb
- Node.js and React

## The Team
**<a href = "https://maru-ko.github.io/" target="_blank" >Marco Avila</a>** *Software Engineer* New York, NY 

**<a href = "http://www.dev.mohamadel-chanti.com/" target="_blank">Mohamad El-Chanti</a>** *Software Engineer* Toronto, ON, Canada

**<a href = "http://martingraham.dev" target="_blank" >Martin Graham</a>** *Software Engineer* Waco, TX 

**<a href = "https://codywilliams.dev/" target="_blank">Cody Williams</a>** *Software Engineer* Los Angeles, CA

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

# License

MIT License

Copyright (c) 2022 Aria

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
