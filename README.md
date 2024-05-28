# Queue Management API

This project implements a REST API for managing queues of messages using Node.js and Express. The API supports adding messages to queues and retrieving the next message from a queue with an optional timeout.

## Features

- **Add Message to Queue**: POST a message to a specified queue.
- **Get Next Message from Queue**: GET the next message from a specified queue, with support for a timeout if the queue is empty.



## Testing Approach
The tests are written in a way that ensures the server is running concurrently with the test script. We use the concurrently package to handle this.

##  Example Test Workflow
Start the Server: The server is started using npm run start.
Run the Test Script: The test script waits for the server to be up and running, then performs the tests by sending requests to the server.
## Test Scenarios:
Adding a message to the queue.
Fetching the next message from the queue with a timeout.
Checking that each customer will got his relevent message