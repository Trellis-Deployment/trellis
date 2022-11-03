import zlib from 'zlib';
import getDeploymentById from '../util/deploymentsTableUtils/getDeploymentById';
import updateDeploymentStateById from '../util/deploymentsTableUtils/updateDeploymentStateById';
import getStageById from '../util/stagesTableUtils/getStageById';
import updateStageState from '../util/stagesTableUtils/updateStageState';
import updateDeploymentLogStream from "../util/deploymentsTableUtils/updateDeploymentLogStream";
import getDeploymentByLogStream from "../util/deploymentsTableUtils/getDeploymentByLogStream";
import getStagesByAppId from '../util/stagesTableUtils/getStagesByAppId';
import invokeWebSocketMessage from '../util/deployment/invokeWebSocketMessage';
import getAppByAppId from '../util/appsTableUtils/getAppByAppId';
/*
STEPS NEED TO ACCOMPLISH UPDATING THE STATUS:
  - Add logStream name to deployment table using the deploymentId
  - Once the deploymentId is added, use the logStream to get the deployment
  - update the deployment status
  - use the stageId from the deployment, get the stage
  - update the stage status !
  - using the appId from the stage, get the app
  - get the userId from the app
  - get the updatedStages using the appId
  - Send a websocket message once you finish looping through the logEvents
*/
export const main = async (event, context, callback) => {
  console.log('LogScheduledEventTriggered');
  const payload = Buffer.from(event.awslogs.data, 'base64');
  const parsed = JSON.parse(zlib.unzipSync(payload).toString());
  const logEvents = parsed.logEvents;
  const logStream = parsed.logStream;
  let deployment;
  let logs = '';
  let deployed = false;
  for (const logEvent of logEvents) {
    let log = logEvent.message;
    if (log.includes('DEPLOYMENT_ID')) {
      log = log.replace(/[\{\}\"\'\ ]/g, '');
      const deploymentId = log.split(':')[1];
      deployment = await getDeploymentById(deploymentId);
      await updateDeploymentLogStream(deployment, logStream);
    } else {
      if (log.includes('SUCCESS: APP DEPLOYED!')) {
        deployed = true;
      }
      logs = logs + `\n${log}`;
    }
  }
  if (!deployment) {
    // change this function to use filterExpressions?
    deployment = await getDeploymentByLogStream(logStream);
  }
  let state = 'deploying';
  if (deployed) {
    state = 'deployed';
  }
  const updateDeploymentState = updateDeploymentStateById(
    {
      deploymentId: deployment.deploymentId,
      state,
      logs: deployment.logs + logs,
    }
  );
  const stage = await getStageById(deployment.stageId);
  await updateStageState({ stage, state, commitId: deployment.commitId });
  const appPromise = getAppByAppId(stage.appId);
  const updatedStagesPromise = getStagesByAppId(stage.appId);
  const [updatedDeployment, app, updatedStages] = await Promise.all([updateDeploymentState, appPromise, updatedStagesPromise]);
  await invokeWebSocketMessage({userId: app.userId, updatedStages});
  callback(null, 'Finished');
};