const getAccounts = async (mobileNumber) => {
    return [
        { accountNumber: "1234567890", type: "Savings", balance: 15000 },
        { accountNumber: "9876543210", type: "Current", balance: 22000 }
    ];
};

const getBalance = async (accountNumber) => {
    const mockBalances = {
        "1234567890": 15000,
        "9876543210": 22000
    };
    return `Your balance for account ${accountNumber} is ₹${mockBalances[accountNumber] || 0}`;
};

const getLastTransactions = async (accountNumber) => {
    return [
        { date: "2025-02-10", type: "Debit", amount: 500, description: "ATM Withdrawal" },
        { date: "2025-02-09", type: "Credit", amount: 2000, description: "Salary Deposit" },
        { date: "2025-02-08", type: "Debit", amount: 1500, description: "Online Shopping" }
    ];
};

const emailStatement = async (accountNumber, email) => {
    return `Account statement for account ${accountNumber} has been sent to ${email}`;
};

const confirmKYC = async (customerId) => {
    return `KYC Status for Customer ${customerId}: ✅ Verified`;
};

module.exports = { getAccounts, getBalance, getLastTransactions, emailStatement, confirmKYC };
