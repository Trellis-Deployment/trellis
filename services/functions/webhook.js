import handler from "../util/templates/handler";
import AWS from "aws-sdk";
import getDataForAutoDeployment from "../util/deployment/getDataForAutoDeployment";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  //console.log(data);
  const refArray = (data.ref.split("/"));
  let branch = refArray[refArray.length - 1];
  const user = data.repository.owner.name;
  const repoName = data.repository["full_name"];
  // if(branch !== "main" || branch !== "master") {
  //   return "Not important";
  // }

  branch = "main";
  const cloneUrl = data.repository['clone_url'];
  const {appName, stageName, token} = await getDataForAutoDeployment({ repoName, branch });
  console.log({cloneUrl, appName, stageName, token});
  /*
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName: process.env.DEPLOY_LAMBDA_NAME,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({ "branch": branch }),
  };
  lambda.invoke(params, function(err, data) {
    if (err) {
      console.error("failed my friend");
      console.log({err});
      context.fail(err);
    } else {
      console.log(data.Payload);
      context.succeed('deploy said ' + data.Payload);
      console.log("finished");
  
      return { user, repoName, branch };
    }
  });
*/
  
});
