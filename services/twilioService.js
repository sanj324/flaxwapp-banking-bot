const twilio = require('twilio');

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendMessage = async (to, message) => {
    try {
        // Ensure the phone number is correctly formatted for WhatsApp
        if (!to.startsWith("whatsapp:+")) {
            console.error("❌ Invalid phone number format:", to);
            return "Error: Phone number must be in WhatsApp format (e.g., whatsapp:+919876543210)";
        }

        const response = await client.messages.create({
            from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
            to: to, // No need to modify 'to' since it's already formatted
            body: message
        });

        console.log("✅ Message Sent:", response.sid);
    } catch (error) {
        console.error("❌ Error sending message:", error.message);
    }
};

module.exports = { sendMessage };
