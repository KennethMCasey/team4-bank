export const environment = {
  production: true,
  apiPort: 5200,                    // web api port number
  apiEndpoints: {
    addCustomer: '/api/Customers/AddCustomer',        // expects Customer shaped JSON object in the body
    getCustomers: '/api/Customers/ListCustomers',     // accepts optional query parameters: S, MinSalary=[\d*]
    getCustomer:  '/api/Customers/GetCustomer/',      // expects integer id at end of url path, e.g. .../GetCustomer/1
    editCustomer: '/api/Customers/EditCustomer/',     // expects Customer shaped JSON object in the body
    deleteCustomer: '/api/Customers/DeleteCustomer/', //expects integer id at end of url path, e.g. .../DeleteCustomer/1
    addAccount: '/api/Accounts/AddAccount',
    getAccounts: '/api/Accounts/ListAccounts',
    getAccount:  '/api/Accounts/GetAccount/',
    deleteAccount: '/api/Accounts/DeleteAccount/',
    addTransaction: '/api/Transactions/AddTransaction',
    getTransactions: '/api/Transactions/ListTransactions'
}
};
