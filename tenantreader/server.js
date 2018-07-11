const AWS = require('aws-sdk');

const myCredentials = new AWS.Credentials("x", "x");
const sqs = new AWS.SQS({
    apiVersion: '2012-11-05',
    credentials: myCredentials,
    region: "none",
    endpoint: "http://sqs:9324"
});

const newTenantsQueueURL = "http://sqs:9324/queue/newtenants";
const newMailboxesQueueURL = "http://sqs:9324/queue/newmailboxes";

const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
const runFor = async (interval) => {
    let numSubscription = 0;
    while (true) {
        await timeoutPromise(interval);

        const newTenantsQueueParams = {
            AttributeNames: [
                "SentTimestamp"
            ],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: [
                "All"
            ],
            QueueUrl: newTenantsQueueURL,
            VisibilityTimeout: 30,
            WaitTimeSeconds: 0
        };
        sqs.receiveMessage(newTenantsQueueParams, (err, data) => {
            if (err) {
              console.log("Receive Error", err);
            } else if (data.Messages) {
                for (let message of data.Messages) {
                                        // do job in visivilitytimeout then try delete
                    numSubscription ++;
                    console.log(`${numSubscription}: Ret mailboxes from: ${message.Body} - ${message.MessageId}`);

                    // send a message including emails
                    const messageBody = {
                        newMailboxes: [
                            "a@mail.com",
                            "b@mail.com",
                        ],
                    };
                    const params = {
                        DelaySeconds: 1,
                        MessageAttributes: {
                            "MessageBodyType": {
                                DataType: "String",
                                StringValue: "JSON"
                            },
                        },
                        MessageBody: JSON.stringify(messageBody),
                        QueueUrl: newMailboxesQueueURL,
                    };
                       
                    sqs.sendMessage(params, (err, data) => {
                        if (err) {
                            // ERROR
                        } else {
                            // OK
                            const deleteParams = {
                                QueueUrl: newTenantsQueueURL,
                                ReceiptHandle: message.ReceiptHandle
                            };

                            sqs.deleteMessage(deleteParams, (err, data) => {
                                if (err) {
                                    console.log("Delete Error", err);
                                } else {
                                    // deleted
                                }
                            });
                        }
                    });

                }
            }
        });
    }
};

console.log("RUN: tenantreader!");
runFor(1000);
