require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { processMessage } = require('./controllers/chatbotController');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ Webhook Route (Ensure this exists)
app.post('/webhook', async (req, res) => {
    try {
        console.log("✅ Received message:", req.body);

        if (!req.body.From || !req.body.Body) {
            return res.status(400).send("Invalid message format.");
        }

        await processMessage(req.body);
        res.status(200).send("Message processed.");
    } catch (error) {
        console.error("❌ Error in /webhook:", error);
        res.status(500).send("Internal Server Error.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
