import AWS from "aws-sdk";

const getCfLogs = async ({stage}) => {
  const client = new AWS.CloudFormation({
    accessKeyId: stage.IAMAccessKey,
    secretAccessKey: stage.IAMSecretKey,
  });
  const params = {
    StackName: 'dev-notes-*',
  }
  // client.describeStackEvents(params, function(err, data) {
  //   if (err) console.log(err, err.stack);
  //   else console.log(data);
  // })
  client.describeStacks({}, function(err, data) {
  if (err) console.log(err, err.stack);
  else console.log({stacks});
  })
}

export default getCfLogs;