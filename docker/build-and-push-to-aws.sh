#!/bin/bash

# Fill in with your AWS information
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID_NUMBER=$(aws sts get-caller-identity --query "Account" --output text)

reponame="build-server"
output=$(aws ecr describe-repositories --repository-names $reponame 2>&1)

if [ $? -ne 0 ]; then
  if echo ${output} | grep -q RepositoryNotFoundException; then
    aws ecr create-repository --repository-name $reponame 2>&1 > /dev/null
  else
    >&2 echo ${output}
  fi
fi

aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID_NUMBER.dkr.ecr.$AWS_REGION.amazonaws.com
docker build -t $reponame . --platform=linux/amd64
docker tag $reponame:latest $AWS_ACCOUNT_ID_NUMBER.dkr.ecr.$AWS_REGION.amazonaws.com/$reponame:latest
docker push $AWS_ACCOUNT_ID_NUMBER.dkr.ecr.$AWS_REGION.amazonaws.com/$reponame:latest

