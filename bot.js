// import pkg from "whatsapp-web.js";
// const { Client, LocalAuth, MessageMedia } = pkg;
// import qrcode from "qrcode";
// import express from "express";
// import dotenv from "dotenv";
// import Groq from "groq-sdk";

// // Load environment variables
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;
// const clients = {}; // Store multiple clients
// const qrCodes = {}; // Store QR codes per session
// let botReady = {};  // Track if each bot is ready
// let orderHistory = {}; // Store user orders per session
// let menu = {};

// // Initialize Groq API
// const groq = new Groq({ apiKey: "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" });

// app.get("/start", (req, res) => {
//   const session = req.query.session;
//   if (!session) {
//     return res.status(400).send("Session ID is required");
//   }

//   if (clients[session]) {
//     return res.send("Session already initialized");
//   }

//   clients[session] = new Client({
//     authStrategy: new LocalAuth({ clientId: session }),
//   });

//   // Generate QR code
//   clients[session].on("qr", async (qr) => {
//     console.log(`New QR Code Generated for ${session}...`);
//     qrCodes[session] = await qrcode.toDataURL(qr);
//     botReady[session] = false;
//   });

//   // When WhatsApp is ready
//   clients[session].on("ready", () => {
//     console.log("✅ WhatsApp Bot (${session}) is Ready!");
//     botReady[session] = true;
    
//     fetch('http://127.0.0.1:5000/extract_menu')
//       .then(response => response.json())
//       .then(data => {
//         menu = data;
//         console.log("Menu extracted:", menu);
//       })
//       .catch(error => {
//         console.error("Error fetching menu:", error);
//       });
//   });

//   // Handle incoming messages
//   clients[session].on("message", async (msg) => {
//     if (msg.from === "status@broadcast") return;

//     console.log(`📩 New Message from ${msg.from} on ${session}: ${msg.body}`);
//     const userId = msg.from;
//     if (!orderHistory[userId]) orderHistory[userId] = [];

//     if (["menu", "hello", "hi"].includes(msg.body.toLowerCase())) {
//       const media = MessageMedia.fromFilePath("2.jpg");
//       await clients[session].sendMessage(msg.from, media, { caption: "Here's our menu. Let me know what you'd like to order!" });
//     } else {
//       const reply = await getGroqResponse(msg.body, userId);
//       await msg.reply(reply);
      
//       if (reply.includes("You have ordered")) {
//         orderHistory[userId].push(msg.body);
//       }
//     }
//   });

//   // Start WhatsApp client
//   clients[session].initialize();
//   res.send(`Session ${session} initialized.`);
// });

// // Function to get response from Groq AI
// async function getGroqResponse(userMessage, userId) {
//   const prompt = `
//   You are a restaurant assistant bot handling WhatsApp orders.
//   - If a user asks for the menu, list all items with prices.
//   - If they order an item (e.g., "order Veg Rice 1"), extract item and quantity.
//   - Calculate the total price and format the response as:
//     "You have ordered [item name], quantity: [number].
//      The total price for your order is: ₹[total price].
//      Your order will be ready in 15 minutes. Thank you for ordering with us."
//   - If they want to order more, continue adding to the order. If they say "No", finalize the bill.
  
//   Menu: ${JSON.stringify(menu)}
//   User Order History: ${JSON.stringify(orderHistory[userId] || [])}
//   User: ${userMessage}`;

//   const response = await groq.chat.completions.create({
//     messages: [{ role: "user", content: prompt }],
//     model: "llama-3.3-70b-versatile",
//   });

//   return response.choices[0]?.message?.content || "I'm sorry, I didn't understand.";
// }

// // Serve QR codes for multiple sessions
// app.get("/", (req, res) => {
//   let qrDisplay = Object.keys(qrCodes).map(session => `
//     <h2>Session: ${session}</h2>
//     ${botReady[session] 
//       ? '<p class="status">✅ WhatsApp Bot is Ready!</p>' 
//       : qrCodes[session] 
//         ? `<img src="${qrCodes[session]}" /><p>Scan the QR Code to Log in</p>` 
//         : "<p>Generating QR Code, please wait...</p>"}
//   `).join("<hr>");

//   res.send(`
//     <html>
//       <head>
//         <title>WhatsApp Multi-Session QR Codes</title>
//         <meta http-equiv="refresh" content="5">
//         <style>
//           body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
//           img { width: 300px; }
//           .status { font-size: 20px; font-weight: bold; color: green; margin-top: 20px; }
//         </style>
//       </head>
//       <body>
//         <h1>WhatsApp Multi-Session Bot</h1>
//         ${qrDisplay}
//         <p>Refresh the page if the QR code is not visible.</p>
//       </body>
//     </html>
//   `);
// });

// // Start Express server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// // });
// import pkg from "whatsapp-web.js";
// const { Client, LocalAuth, MessageMedia } = pkg;
// import qrcode from "qrcode";
// import express from "express";
// import dotenv from "dotenv";
// import Groq from "groq-sdk";

// // Load environment variables
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;
// const clients = {}; // Store multiple clients
// const qrCodes = {}; // Store QR codes per session
// let botReady = {};  // Track if each bot is ready
// let orderHistory = {}; // Store user orders per session
// let menu = {};
// let QA = {};
// // Initialize Groq API
// const groq = new Groq({ apiKey: "your_groq_api_key" });

// app.get("/start", (req, res) => {
//   const session = req.query.session;
//   if (!session) {
//     return res.status(400).send("Session ID is required");
//   }

//   if (clients[session]) {
//     return res.send("Session already initialized");
//   }

//   clients[session] = new Client({
//     authStrategy: new LocalAuth({ clientId: session }),
//   });

//   // Generate QR code
//   clients[session].on("qr", async (qr) => {
//     console.log(`New QR Code Generated for ${session}...`);
//     qrCodes[session] = await qrcode.toDataURL(qr);
//     botReady[session] = false;
//   });

//   // When WhatsApp is ready
//   clients[session].on("ready", () => {
//     console.log(`✅ WhatsApp Bot (${session}) is Ready!`);
//     botReady[session] = true;
//     fetch('http://127.0.0.1:5000/extract_menu')
//     .then(response => response.json())
//     .then(data => {
//       menu = data;
//     })
//     .catch(error => {
//       console.error("Error fetching menu:", error);
//     });

//     fetch('http://127.0.0.1:5000/qa')
//     .then(response => response.json())
//     .then(data => {
//       QA = data;
//       console.log("QA data:", data);
//       console.log("QA:", QA);
//     })
//     .catch(error => {
//       console.error("Error fetching menu:", error);
//     });
// });

//   // Handle incoming messages
//   clients[session].on("message", async (msg) => {
//     if (msg.from === "status@broadcast") return;

//     console.log(`📩 New Message from ${msg.from} on ${session}: ${msg.body}`);
//     const userId = msg.from;
//     if (!orderHistory[userId]) orderHistory[userId] = [];
//     if (QA)
//     {
//         if (QA[msg.body.toLowerCase()])
//         {
//             await msg.reply(QA[msg.body.toLowerCase()]);

//         }

//     }
//     else {
//         if (["menu", "hello", "hi"].includes(msg.body.toLowerCase())) {
//             const media = MessageMedia.fromFilePath("2.jpg");
//             await clients[session].sendMessage(msg.from, media, { caption: "Here's our menu. Let me know what you'd like to order!" });
//           } else {
//             const reply = await getGroqResponse(msg.body, userId);
//             await msg.reply(reply);
            
//             if (reply.includes("You have ordered")) {
//               orderHistory[userId].push(msg.body);
//             }
//           }
//     }

//   });

//   // Start WhatsApp client
//   clients[session].initialize();
//   res.send(`Session ${session} initialized.`);
// });

// // Function to get response from Groq AI
// async function getGroqResponse(userMessage, userId) {
//   const prompt = `
//   You are a restaurant assistant bot handling WhatsApp orders.
//   - If a user asks for the menu, list all items with prices.
//   - If they order an item (e.g., "order Veg Rice 1"), extract item and quantity.
//   - Calculate the total price and format the response as:
//     "You have ordered [item name], quantity: [number].
//      The total price for your order is: ₹[total price].
//      Your order will be ready in 15 minutes. Thank you for ordering with us."
//   - If they want to order more, continue adding to the order. If they say "No", finalize the bill.
  
//   Menu: ${JSON.stringify(menu)}
//   User Order History: ${JSON.stringify(orderHistory[userId] || [])}
//   User: ${userMessage}`;

//   const response = await groq.chat.completions.create({
//     messages: [{ role: "user", content: prompt }],
//     model: "llama-3.3-70b-versatile",
//   });

//   return response.choices[0]?.message?.content || "I'm sorry, I didn't understand.";
// }

// // Serve QR codes for a specific session
// app.get("/", (req, res) => {
//   const session = req.query.sessionid;
//   if (!session || !qrCodes[session]) {
//     return res.send("Invalid or missing session ID");
//   }

//   res.send(`
//     <html>
//       <head>
//         <title>WhatsApp Session QR Code</title>
//         <meta http-equiv="refresh" content="5">
//         <style>
//           body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
//           img { width: 300px; }
//           .status { font-size: 20px; font-weight: bold; color: green; margin-top: 20px; }
//         </style>
//       </head>
//       <body>
//         <h1>WhatsApp Bot - Session ${session}</h1>
//         ${botReady[session] 
//           ? '<p class="status">✅ WhatsApp Bot is Ready!</p>' 
//           : `<img src="${qrCodes[session]}" /><p>Scan the QR Code to Log in</p>`}
//         <p>Refresh the page if the QR code is not visible.</p>
//       </body>
//     </html>
//   `);
// });

// // Start Express server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// // });
// import pkg from "whatsapp-web.js";
// const { Client, LocalAuth, MessageMedia } = pkg;
// import qrcode from "qrcode";
// import express from "express";
// import dotenv from "dotenv";
// import Groq from "groq-sdk";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;
// const clients = {}; // Store multiple clients
// const qrCodes = {}; // Store QR codes per session
// let botReady = {};  // Track if each bot is ready
// let orderHistory = {}; // Store user orders per session
// let menu = {};
// let QA = {};
// const groq = new Groq({ apiKey: "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" });

// app.get("/start", (req, res) => {
//   const session = req.query.session;
//   if (!session) {
//     return res.status(400).send("Session ID is required");
//   }

//   if (clients[session]) {
//     return res.send("Session already initialized");
//   }

//   clients[session] = new Client({
//     authStrategy: new LocalAuth({ clientId: session }),
//   });

//   clients[session].on("qr", async (qr) => {
//     console.log(`New QR Code Generated for ${session}...`);
//     qrCodes[session] = await qrcode.toDataURL(qr);
//     botReady[session] = false;
//   });

//   clients[session].on("ready", () => {
//     console.log(`✅ WhatsApp Bot (${session}) is Ready!`);
//     botReady[session] = true;

//     fetch('http://127.0.0.1:5000/extract_menu')
//       .then(response => response.json())
//       .then(data => {
//         menu = data;
//       })
//       .catch(error => console.error("Error fetching menu:", error));

//     fetch('http://127.0.0.1:5000/qa')
//       .then(response => response.json())
//       .then(data => {
//         QA = data;
//         console.log("QA data:", data);
//       })
//       .catch(error => console.error("Error fetching QA:", error));
//   });

//   clients[session].on("message", async (msg) => {
//     if (msg.from === "status@broadcast") return;

//     console.log(`📩 New Message from ${msg.from} on ${session}: ${msg.body}`);
//     const userId = msg.from;
//     if (!orderHistory[userId]) orderHistory[userId] = [];

//     if (QA && QA[msg.body.toLowerCase()]) {
//       await msg.reply(QA[msg.body.toLowerCase()]);
//     } else {
//       if (["menu", "hello", "hi"].includes(msg.body.toLowerCase())) {
//         const media = MessageMedia.fromFilePath("2.jpg");
//         await clients[session].sendMessage(msg.from, media, { caption: "Here's our menu. Let me know what you'd like to order!" });
//       } else {
//         const reply = await getGroqResponse(msg.body, userId);
//         await msg.reply(reply);
        
//         if (reply.includes("You have ordered")) {
//           orderHistory[userId].push(msg.body);
//         }
//       }
//     }
//   });

//   clients[session].initialize();
//   res.send(`Session ${session} initialized.`);
// });

// async function getGroqResponse(userMessage, userId) {
//   const prompt = `
//   You are a restaurant assistant bot handling WhatsApp orders.
//   - If a user asks for the menu, list all items with prices.
//   - If they order an item (e.g., "order Veg Rice 1"), extract item and quantity.
//   - Calculate the total price and format the response.
  
//   Menu: ${JSON.stringify(menu)}
//   User Order History: ${JSON.stringify(orderHistory[userId] || [])}
//   User: ${userMessage}`;

//   const response = await groq.chat.completions.create({
//     messages: [{ role: "user", content: prompt }],
//     model: "llama-3.3-70b-versatile",
//   });

//   return response.choices[0]?.message?.content || "I'm sorry, I didn't understand.";
// }

// app.get("/", (req, res) => {
//   const session = req.query.session;
//   if (!session || !qrCodes[session]) {
//     return res.send("Invalid or missing session ID");
//   }

//   res.send(`
//     <html>
//       <head>
//         <title>WhatsApp Session QR Code</title>
//         <meta http-equiv="refresh" content="5">
//         <style>
//           body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
//           img { width: 300px; }
//           .status { font-size: 20px; font-weight: bold; color: green; margin-top: 20px; }
//         </style>
//       </head>
//       <body>
//         <h1>WhatsApp Bot - Session ${session}</h1>
//         ${botReady[session] ? '<p class="status">✅ WhatsApp Bot is Ready!</p>' : `<img src="${qrCodes[session]}" /><p>Scan the QR Code to Log in</p>`}
//       </body>
//     </html>
//   `);
// });

// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

import pkg from "whatsapp-web.js";
const { Client, LocalAuth, MessageMedia } = pkg;
import qrcode from "qrcode";
import express from "express";
import dotenv from "dotenv";
import Groq from "groq-sdk";
// import cors from "cors";  // ✅ Import CORS middleware

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST"],
 
// }));

// Store multiple clients, QR codes, and session-specific data
const clients = {};
const qrCodes = {};
let botReady = {};
let orderHistory = {};
let menu = {}; // Store menus per session
let QA = {}; // Store QA data per session
let isauto = {}
// Initialize Groq AI API
const groq = new Groq({ apiKey: "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" });

/**
 * Start a new WhatsApp session
 */
app.get("/start", (req, res) => {
  const session = req.query.session;
  const bot_id = req.query.botid;
  if (!session) {
    return res.status(400).send("Session ID is required");
  }

  if (clients[session]) {
    return res.send("Session already initialized");
  }

  clients[session] = new Client({
    authStrategy: new LocalAuth({ clientId: session }),
  });

  clients[session].on("qr", async (qr) => {
    console.log(`New QR Code Generated for ${session}...`);
    qrCodes[session] = await qrcode.toDataURL(qr);
    botReady[session] = false;
  });

  clients[session].on("ready", () => {
    console.log(`✅ WhatsApp Bot (${session}) is Ready! ${bot_id}`);
    botReady[session] = true;

    // Fetch and store menu for this session
    fetch("https://whatsapp-bot-p5ey.onrender.com/get-bot/" + bot_id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Menu fetched for session", data);
        menu[session] = data['menu'];
        QA[session] = data['questions'];
        isauto[session] = data['isauto'];
        console.log(`Menu fetched for session ${menu[session]}`);
        console.log(`QA fetched for session ${QA[session]}`);

      })
      .catch((error) => console.error(`Error fetching menu for ${session}:`, error));

  
  });

  clients[session].on("message", async (msg) => {
    if (msg.from === "status@broadcast") return;

    console.log(`📩 New Message from ${msg.from} on ${session}: ${msg.body}`);
    const userId = msg.from;
    if (!orderHistory[userId]) orderHistory[userId] = [];
    console.log("QA response found:", QA[session]);
    // Check predefined QA responses
    if (QA[session] && QA[session][msg.body.toLowerCase()]) {
      console.log("QA response found:", QA[session][msg.body.toLowerCase()]);
      await msg.reply(QA[session][msg.body.toLowerCase()]);
    } 
    else if(isauto[session] == true) {
      if (["menu", "hello", "hi"].includes(msg.body.toLowerCase())) {
        const media = MessageMedia.fromFilePath("2.jpg");
        await clients[session].sendMessage(msg.from, media, {
          caption: "Here's our menu. Let me know what you'd like to order!",
        });
      } 
      else {
        const reply = await getGroqResponse(msg.body, userId, session);
        await msg.reply(reply);

        if (reply.includes("You have ordered")) {
          orderHistory[userId].push(msg.body);
        }
      }
    }
  });

  clients[session].initialize();
  res.send(`Session ${session} initialized.`);
});

/**
 * Get Groq AI response for user messages
 */
async function getGroqResponse(userMessage, userId, session) {
  const prompt = `
  You are a restaurant assistant bot handling WhatsApp orders.
  - If a user asks for the menu, list all items with prices.
  - If they order an item (e.g., "order Veg Rice 1"), extract item and quantity.
  - Calculate the total price and format the response.
  
  Menu: ${JSON.stringify(menu[session] || {})}
  User Order History: ${JSON.stringify(orderHistory[userId] || [])}
  User: ${userMessage}`;
  console.log("Prompt:", prompt);
  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    return response.choices[0]?.message?.content || "I'm sorry, I didn't understand.";
  } catch (error) {
    console.error("Error generating Groq response:", error);
    return "I'm sorry, I encountered an error.";
  }
}

/**
 * Serve QR code for session login
 */
app.get("/", (req, res) => {
  const session = req.query.session;
  if (!session || !qrCodes[session]) {
    return res.send("Invalid or missing session ID");
  }

  res.send(`
    <html>
      <head>
        <title>WhatsApp Session QR Code</title>
        <meta http-equiv="refresh" content="5">
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          img { width: 300px; }
          .status { font-size: 20px; font-weight: bold; color: green; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>WhatsApp Bot - Session ${session}</h1>
        ${botReady[session] ? '<p class="status">✅ WhatsApp Bot is Ready!</p>' : `<img src="${qrCodes[session]}" /><p>Scan the QR Code to Log in</p>`}
      </body>
    </html>
  `);
});







app.get("/bulk_start", async (req, res) => {
  const session = req.query.session;
  if (!session) {
    return res.status(400).send("Session ID is required");
  }

  if (clients[session]) {
    return res.send("Session already initialized");
  }

  clients[session] = new Client({
    authStrategy: new LocalAuth({ clientId: session }),
  });

  clients[session].on("qr", async (qr) => {
    console.log(`New QR Code Generated for ${session}...`);
    qrCodes[session] = await qrcode.toDataURL(qr);
    botReady[session] = false;
  });

  clients[session].on("ready", () => {
    console.log(`✅ WhatsApp Bot (${session}) is Ready! ${bot_id}`);
    botReady[session] = true;
  
  });





  clients[session].initialize();
  res.send(`Session ${session} initialized.`);
});

app.use(express.json()); // ✅ Middleware to parse JSON request bodies

app.post("/send-messages", async (req, res) => {
  const { session, messages } = req.body;
  // const messages = {"7488259671": "hello world"}

  if (!session || !messages) {
    return res.status(400).send("Session and messages JSON are required.");
  }

  if (!clients[session]) {
    return res.status(404).send(`Session ${session} not found.`);
  }

  try {
    await sendBulkMessages(messages, session);
    res.send("Messages sent successfully.");
  } catch (error) {
    console.error("Error sending messages:", error);
    res.status(500).send("Failed to send messages.");
  }
});


async function sendBulkMessages(messagesJson, session) {
  const client = clients[session];

  for (const number in messagesJson) {
    if (messagesJson.hasOwnProperty(number)) {
      const message = messagesJson[number];
      try {
        console.log(`📤 Sending message to ${number}: ${message}`);
        await client.sendMessage(`${number}@c.us`, message);
        console.log(`✅ Message sent to ${number}`);
      } catch (error) {
        console.error(`❌ Failed to send message to ${number}:`, error);
      }
    }
  }
}




// Start Express server
app.listen(PORT, () => console.log(`🚀 Server running at http://0.0.0.0:${PORT}`));
