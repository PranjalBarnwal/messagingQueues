const {Queue} = require("bullmq");
const notificationQueue = new Queue("email-queue",{
    host: "127.0.0.1",  // Use your Redis server's host
    port: 6379,         // Default Redis port
    maxRetriesPerRequest: null, // Required for BullMQ
  });

async function init() {
let i=0;
while(i++<10){
    const res = await notificationQueue.add("email to happy", {
        email: "happy@gmail.com",
        subject:"Welcome Message",
        body:"Hey, Happy, Welcome"
    });

    console.log("Job added to queue", res.id);
}
}

init();