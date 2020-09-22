export const environment = {
  production: true,
  apiPort: 5200,                    // web api port number
  apiEndpoints: {
    Customers: '/api/Customers/',        // expects Customer shaped JSON object in the body
    Accounts: '/api/Accounts/',
    Transactions: '/api/Transactions/'
  }
};
