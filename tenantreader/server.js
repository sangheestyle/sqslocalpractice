var AWS = require('aws-sdk/global');
var SQS = require('aws-sdk/clients/SQS');

var myCredentials = new AWS.Credentials("x", "x");

var sqs = new AWS.SQS({
    apiVersion: '2012-11-05',
    credentials: myCredentials,
    region: "none",
    endpoint: "http://sqs:9324"
});

var queueURL = "http://sqs:9324/queue/queue1";

var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 1,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: queueURL,
 VisibilityTimeout: 0,
 WaitTimeSeconds: 0
};

const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
const runFor = async (interval) => {
    while (true) {
        await timeoutPromise(interval);

        sqs.receiveMessage(params, function(err, data) {
            if (err) {
              console.log("Receive Error", err);
            } else if (data.Messages) {
              console.log("Message: ", data.Messages[0]);
            } else {
              console.log("Empty!");
            }
        });
    }
};

console.log("RUN!");
runFor(5000);
