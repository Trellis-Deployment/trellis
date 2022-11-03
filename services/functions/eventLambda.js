import zlib from 'zlib';
export const main = (event, context, callback) => {
  console.log('LogScheduledEvent');
  const payload = Buffer.from(event.awslogs.data, 'base64');
  const logEvents = JSON.parse(zlib.unzipSync(payload).toString()).logEvents;
  logEvents.forEach(logEvent => {
    const log = logEvent.message;
    console.log({log});
  })
  callback(null, 'Finished');
};