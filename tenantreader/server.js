const AWS = require('aws-sdk');

const myCredentials = new AWS.Credentials("x", "x");
const sqs = new AWS.SQS({
    apiVersion: '2012-11-05',
    credentials: myCredentials,
    region: "none",
    endpoint: "http://sqs:9324"
});

const queueURL = "http://sqs:9324/queue/newtenants";
const params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 0
};

const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
const runFor = async (interval) => {
    let numSubscription = 0;
    while (true) {
        await timeoutPromise(interval);

        sqs.receiveMessage(params, (err, data) => {
            if (err) {
              console.log("Receive Error", err);
            } else if (data.Messages) {
                for (let message of data.Messages) {
                    const deleteParams = {
                        QueueUrl: queueURL,
                        ReceiptHandle: message.ReceiptHandle
                    };
                    // do job in visivilitytimeout then try delete
                    numSubscription ++;
                    console.log(`${numSubscription}: Ret mailboxes from: ${message.Body} - ${message.MessageId}`);
                    sqs.deleteMessage(deleteParams, (err, data) => {
                        if (err) {
                            console.log("Delete Error", err);
                        } else {
                            // deleted
                        }
                    });
                }
            }
        });
    }
};

console.log("RUN!");
runFor(1000);
