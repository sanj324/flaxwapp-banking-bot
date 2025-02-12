const { sendMessage } = require('../services/twilioService');
const { getBalance, getAccounts, getLastTransactions, emailStatement, confirmKYC } = require('../services/bankingService');

const processMessage = async (req) => {
    try {
        let { From, Body } = req;

        // Ensure the sender number is in WhatsApp E.164 format
        if (!From.startsWith("whatsapp:+")) {
            console.error("❌ Invalid sender number:", From);
            return;
        }

        let responseMessage = "I can help you with:\n1. Type 'balance' for Balance Inquiry\n2. Type 'transactions' for Last 10 Transactions\n3. Type 'kyc' for KYC Confirmation\n4. Type 'email statement' for Account Statement";

        if (Body.toLowerCase().includes('balance')) {
            responseMessage = await getBalance("1234567890");
        } else if (Body.toLowerCase().includes('transactions')) {
            const transactions = await getLastTransactions("1234567890");
            responseMessage = transactions.map(tx => `${tx.date} - ${tx.type} - ₹${tx.amount} (${tx.description})`).join("\n");
        } else if (Body.toLowerCase().includes('kyc')) {
            responseMessage = await confirmKYC("CUSTOMER_ID_123");
        } else if (Body.toLowerCase().includes('email statement')) {
            responseMessage = await emailStatement("1234567890", "user@example.com");
        }

        await sendMessage(From, responseMessage);
    } catch (error) {
        console.error("❌ Error processing message:", error.message);
    }
};

module.exports = { processMessage };
