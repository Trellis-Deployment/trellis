#!/bin/bash

# reponame="build-server"
# set -a
# source <(cat ../.env | sed -e '/^#/d;/^\s*$/d' -e "s/'/'\\\''/g" -e "s/=\(.*\)/='\1'/g")
# set +a

# output=$(aws ecr describe-repositories --repository-names $reponame 2>&1)

# if [ $? -ne 0 ]; then
#   if echo ${output} | grep -q RepositoryNotFoundException; then
#     aws ecr create-repository --repository-name $reponame 2>&1 > /dev/null
#   else
#     >&2 echo ${output}
#   fi
# fi

# aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID_NUMBER.dkr.ecr.$AWS_REGION.amazonaws.com
# docker build -t $reponame .
# docker tag $reponame:latest $AWS_ACCOUNT_ID_NUMBER.dkr.ecr.$AWS_REGION.amazonaws.com/$reponame:latest
# docker push $AWS_ACCOUNT_ID_NUMBER.dkr.ecr.$AWS_REGION.amazonaws.com/$reponame:latest


reponame="build-server"
echo "Enter your AWS_ID (12-digit-number):"
read AWS_ID
aws ecr describe-repositories --repository-names $reponame 2>&1 > /dev/null
status=$?
if [[ ! "${status}" -eq 0 ]]; then
    aws ecr create-repository --repository-name $reponame
fi
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ID.dkr.ecr.us-east-1.amazonaws.com
docker build -t $reponame .
docker tag $reponame:latest $AWS_ID.dkr.ecr.us-east-1.amazonaws.com/$reponame:latest
docker push $AWS_ID.dkr.ecr.us-east-1.amazonaws.com/$reponame:latest
