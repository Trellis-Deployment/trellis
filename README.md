# Installation

<!-- 1. TODO: - Something about installing a github app -->

1. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-set-up.html) and [configure your credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) - these are used to deploy Trellis on your AWS account
1. Clone the project - `git clone https://github.com/Trellis-Deployment/trellis.git`
1. Install the package dependencies - `cd trellis` and `npm install`
1. Next we need to locally build and push a docker image to ECR - the name of this image is hard-coded into the build-server task
   1. In `docker-container` is a script build and image and loads it to AWS ECR. The script loads for your 12 digit AWS number from the .env file. You must execute the script from the `docker-container` directory
   1. The `.env` file also allows you to specify the region - default is `us-east-1`
   1. Make the `/docker-container/build-and-push-to-aws.sh` executable with `chmod a+rx build-and-push-to-aws.sh`
   1. run `./build-and-push-to-aws.sh`
   1. If you like, go to ECR in the AWS console and verify the container exists

<!-- 1. TODO: do we need to build the  front end first manually / npm install?-->

1. Run `npx sst deploy` from the root directory of the project.
