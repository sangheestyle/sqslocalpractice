const express = require('express');
const bodyParser = require("body-parser");
const AWS = require('aws-sdk');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const myCredentials = new AWS.Credentials("x", "x");
const sqs = new AWS.SQS({
    apiVersion: '2012-11-05',
    credentials: myCredentials,
    region: "none",
    endpoint: "http://sqs:9324"
});
const queueURL = "http://sqs:9324/queue/newtenants";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.post('/tenants', (req, res) => {
    const messageBody = {
        name: req.body["name"],
    };
    const params = {
        DelaySeconds: 2,
        MessageAttributes: {
            "MessageBodyType": {
                DataType: "String",
                StringValue: "JSON"
            },
        },
        MessageBody: JSON.stringify(messageBody),
        QueueUrl: queueURL,
    };
       
    sqs.sendMessage(params, (err, data) => {
        if (err) {
           return res.send({ status: err });
        } else {
           return res.send({ status: "OK" });
        }
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);