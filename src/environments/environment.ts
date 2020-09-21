// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
    getTransactions: '/api/Transactions/ListTransactions' // expects Transactions shaped JSON object in the body
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
