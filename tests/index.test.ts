// it was easier then setting up jest and other things
import { addMessageToQueue, getMessageFromTheQueue } from "./api.sdk";



async function shouldGetMessageFromTheQueue() {
    const queueName = "testQueue";
    const message1 = { text: "First message" };
    const message2 = { text: "Second message" };
  
    const timeout = 50000; // 50 seconds
  
    // First request to fetch message with 50-second timeout
    console.warn("sending first request to fetch message with 50-second timeout");
    const firstFetchPromise = getMessageFromTheQueue(queueName, timeout).then((response) => {
      console.log("First message fetched:", response);
      if (response.message.message.text !== message1.text) {
        throw new Error("Failed to fetch the first message from the queue");
      }
    });
  
    // Second request to fetch message with 50-second timeout
    
    console.warn("sending second request to fetch message with 50-second timeout");
    const secondFetchPromise = getMessageFromTheQueue(queueName, timeout).then((response) => {
      console.log("Second message fetched:", response);
      if (response.message.message.text !== message2.text) {
        throw new Error("Failed to fetch the second message from the queue");
      }
    });
  
    // Wait a bit to ensure the fetch requests are set up
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    // Insert the first message, should be fetched by the first fetch request
    console.warn("adding first message to the queue");
    const addFirstMessageResponse = await addMessageToQueue(queueName, message1);
    if (addFirstMessageResponse.message !== 'Message added to the queue') {
      throw new Error("Failed to add the first message to the queue");
    }
  
    // Insert the second message, should be fetched by the second fetch request
    console.warn("adding second message to the queue");
    const addSecondMessageResponse = await addMessageToQueue(queueName, message2);
    if (addSecondMessageResponse.message !== 'Message added to the queue') {
      throw new Error("Failed to add the second message to the queue");
    }
  
    // Await both fetch promises to ensure they complete
    await Promise.all([firstFetchPromise, secondFetchPromise]);
}

(async () => {
  // lets wait and ensure the server is running
  await new Promise((resolve) => setTimeout(resolve, 3000));

  
  await shouldGetMessageFromTheQueue();
})();

// it("should get the next message from the queue", async () => {
//   const queueName = "testQueue";
//   const message = { text: "Hello, World!" };

//   // First, add a message to the queue
//   await addMessage(queueName, message);

//   const response = await request(app).get(`/api/${queueName}`);

//   expect(response.status).toBe(StatusCodes.OK);
//   expect(response.body.message).toEqual(message);
// });

// it("should return 204 if no message in the queue after timeout", async () => {
//   const queueName = "emptyQueue";

//   const response = await request(app).get(`/api/${queueName}?timeout=1000`);

//   expect(response.status).toBe(StatusCodes.NO_CONTENT);
// });
//   });
