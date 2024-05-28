import { StatusCodes } from "http-status-codes";
import { getUniqueId } from "./utils";
import { Queue, WaitingRequest, Response } from "./types";

export const queues: Queue = {};
const waitingRequests: { [key: string]: WaitingRequest[] } = {};

export async function addMessage(
  queueName: string,
  message: string
): Promise<Response> {
    queues[queueName] = queues[queueName] || [];
  
    const msg: Queue[0][0] = {
        id: getUniqueId(),
        message,
      }

  queues[queueName].push({
    id: getUniqueId(),
    message,
  });

  // Check if there are any waiting requests for this queue
  if (waitingRequests[queueName]?.length) {
    console.log("Found waiting requests for queue: ", queueName);
    // Get the oldest
    const waitingRequest = waitingRequests[queueName].shift();
    if (waitingRequest) {
      clearTimeout(waitingRequest.timeout);
      waitingRequest.resolve({
        status: StatusCodes.OK,
        data: msg,
      });
    }
  }

  return {
    status: StatusCodes.CREATED,
    data: { message: "Message added to the queue" },
  };
}

export async function getNextMessage(
  queueName: string,
  timeout: number
): Promise<Response> {
  return new Promise((resolve) => {
    if (queues[queueName]?.length) {
      const message = queues[queueName].shift();
      resolve({
        status: StatusCodes.OK,
        data: message,
      });
      return;
    }

    // when timeout passed we always return 204
    const timeoutId = setTimeout(() => {
      const waitingList = waitingRequests[queueName];
      if (waitingList) {
        // Waiting time passed lets remove the request from the waiting list when timeout occurs
        const index = waitingList.findIndex((req) => req.resolve === resolve);
        if (index !== -1) {
          clearTimeout(waitingList[index].timeout);
          console.log("Removed from waiting list for queue: ", queueName);
          waitingList.splice(index, 1);
        }
      }
      resolve({
        status: StatusCodes.NO_CONTENT,
        data: {},
      });
    }, timeout);

    // Add the request to the waiting list
    if (!waitingRequests[queueName]) {
      waitingRequests[queueName] = [];
    }
    waitingRequests[queueName].push({
      resolve,
      timeout: timeoutId,
    });

    console.log("Added to waiting list for queue: ", queueName);
  });
}
