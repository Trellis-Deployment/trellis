import AWS from "aws-sdk";

const getCFLogs = async ({stage}) => {

  const client = new AWS.SecretsManager({
    region: process.env.REGION,
  });
  try {
    client.getSecretValue({ SecretId: stage.IAMCredentialsLocation}, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        const secrets = JSON.parse(data.SecretString);
        const accessKeyId = secrets['iam-number'];
        const secretAccessKey = secrets['iam-code'];
        
        const cloudWatchClient = new AWS.CloudWatchLogs({
          accessKeyId,
          secretAccessKey,
        });

        cloudWatchClient.describeLogStreams({logGroupName: process.env.CONTAINER_LOG_GROUP}, function(err, data) {
          if (err) console.log(err, err.stack);
          else {
            data.logStreams.forEach(stream => {
              console.log({streamName: stream.logStreamName});
              cloudWatchClient.getLogEvents({
                logGroupName: process.env.CONTAINER_LOG_GROUP,
                logStreamName: stream.logStreamName,
              }, function(err, data) {
                if (err) console.log(err, err.stack);
                else {
                  //console.log({data: data.events});
                }
              })
            })
          }
        });
      }
    });
  } catch(e) {
    console.log(e.message);
  }

}

export default getCFLogs;

// const cloudFormationClient = new AWS.CloudFormation({
//   accessKeyId,
//   secretAccessKey,
// });
// cloudFormationClient.describeStacks({}, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else {
//     const stacks = data.Stacks;
//     const myStacks = stacks.filter(stack => {
//       return stack.StackName.includes(stage.stageName);
//     });
//     myStacks.forEach(stack => {
//       if (stack.StackName.includes('dev-trellis')) {
//         return;
//       }
//       cloudFormationClient.describeStackEvents({StackName: stack.StackName}, (err, data) => {
//         if (err) console.log(err, err.stack);
//         else {
//           console.log({events: data.StackEvents});
//         }
//       })
//     })
//     console.log({myStacks});
//   };
// });