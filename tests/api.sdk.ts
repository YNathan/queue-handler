import {Response} from "../src/types";

export async function addMessageToQueue(queueName: string, message: any): Promise<Response['data']> {
  return fetch(`http://localhost:3000/api/${queueName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  }).then((res) => res.json())
}

export async function getMessageFromTheQueue(queueName: string, timeout?: number): Promise<Response['data']> {
    return fetch(`http://localhost:3000/api/${queueName}?timeout=${timeout}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
     
    }).then((res) => res.json());
  }