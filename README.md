```
aws sqs receive-message --queue-url http://localhost:9324/queue/queue1  --region elasticmq --endpoint-url http://localhost:9324 --no-verify-ssl --no-sign-request --attribute-names All --message-attribute-names Al

aws sqs send-message --queue-url http://localhost:9324/queue/queue1  --region elasticmq --endpoint-url http://localhost:9324 --no-verify-ssl --no-sign-request --message-body "hi"
```

From https://codeburst.io/robust-microservices-communication-with-amazon-sqs-queues-84cecf6d87d8
* Using SNS and SQS for a design using a message queue

From https://kevinholditch.co.uk/2017/10/19/running-sns-sqs-locally-in-docker-containers-supporting-fan-out/
* SNS & SQS locally in docker containers supporting fan out

From https://blog.cdemi.io/design-patterns-competing-consumer-pattern/
* Competing consumer pattern

From https://blog.cdemi.io/design-patterns-queue-based-load-leveling-pattern/
* Queue-Based Load Leveling Pattern