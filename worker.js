const { Worker } = require("bullmq");
const { Redis } = require("ioredis");

// Create a Redis connection with required options
const connection = new Redis({
  host: "127.0.0.1",  // Use your Redis server's host
  port: 6379,         // Default Redis port
  maxRetriesPerRequest: null, // Required for BullMQ
});

const sendEmail = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 5000));

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log(`Message received, id: ${job.id}`);
    console.log(`Processing Message`);
    console.log(`Sending email to ${job.data.email}`);
    await sendEmail();
    console.log(`Event Sent`);
  },
  { connection } // Pass the Redis connection
);

console.log("Worker started...");
