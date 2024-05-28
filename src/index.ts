import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addMessage, getNextMessage } from "./queue.service";
import { DEFAULT_TIMEOUT_MS } from "./common.constant";

// REST API for managing queues of messages.

// The REST API:
// 1)
// route POST /api/{queue_name}:
// The body is the message in JSON format.
// This will place a new message in the queue named queue_name.

// 2)
// Gets the next message from queue_name.
// Will return 204 if there’s no message in the queue after the timeout has elapsed.
// If a timeout is not specified, a default of 10 seconds should be used.
// GET /api/{queue_name}?timeout={ms}

const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/:queue_name", async (req: Request, res: Response) => {
  const queueName = req.params.queue_name;
  const message = req.body;
  const response = await addMessage(queueName, message);
  res.status(response.status).send({
    message:
      response.status === StatusCodes.CREATED
        ? "Message added to the queue"
        : "Please contact customer support",
  });
});

app.get("/api/:queue_name", async (req: Request, res: Response) => {
  const queueName = req.params.queue_name;

  const timeout = parseInt(req.query.timeout as string) || DEFAULT_TIMEOUT_MS;
  const message = await getNextMessage(queueName, timeout);

  res.status(message.status).send(message.data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
