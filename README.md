# Payment application End-to-End

A comprehensive digital payment solution built with modern technologies, allowing users to send money, manage wallets, and track transactions with a simulated banking API.

## 🚀 Tech Stack

- **Monorepo**: Organizing multiple projects in a single repository for seamless integration and code sharing.
- **Frontend**: Next.js, TypeScript
  - **Merchand App**: For merchant functionalities.
  - **User App**: For user functionalities.
- **Backend**: Express.js with PostgreSQL
  - **Bank Webhook**: Simulated banking API.
- **Libraries**:
  - `bcryptjs`: For securely hashing passwords.

---


## 📝 Features Overview

### User App

1. **Wallet Management**:
   - Users can **add money to their wallet**.
   - **Wallet functionality**: Allows users to easily manage their funds for future transactions.

2. **Money Transfer**:
   - Users can **send money to other users** securely within the application.

3. **Transaction Tracking**:
   - Users can **track their transaction history**, showing both wallet expenses and transfer details.
   - Details include payment source (wallet or direct transfers), helping users manage their spending effectively.

### Bank Webhook (Simulated Banking API)

1. **Payment Status Verification**:
   - **Check Status**: Simulates checking the payment status (pending, processing, or success).
   - **Update Status**: Marks payments as successful or remains pending based on external bank processing simulation.

2. **Payment Processing Simulation**:
   - Emulates a real banking API's webhook functionality for the application, providing real-time updates on the payment status.

---




