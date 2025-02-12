const axios = require('axios');

const FLAXWAPP_API_KEY = process.env.FLAXWAPP_API_KEY;
const FLAXWAPP_PHONE = process.env.FLAXWAPP_PHONE_NUMBER;

const sendMessage = async (to, message) => {
    const url = "https://flaxwapp.com/api/send-message";
    
    const payload = {
        api_key: FLAXWAPP_API_KEY,
        sender: FLAXWAPP_PHONE,
        number: to,
        message: message
    };

    try {
        const response = await axios.post(url, payload);
        console.log("Message Sent:", response.data);
    } catch (error) {
        console.error("Error sending message:", error.response ? error.response.data : error.message);
    }
};

module.exports = { sendMessage };
