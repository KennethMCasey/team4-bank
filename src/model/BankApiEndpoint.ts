export interface BankApiEndpoint {
    addCustomer:    string,     // expects Customer shaped JSON object in the body
    editCustomer:   string,     // expects Customer shaped JSON object in the body
    getCustomers:   string,     // accepts optional query parameters: 
    getCustomer:    string,     // expects integer id at end of url path, e.g. .../GetCustomerk/1
    deleteCustomer: string ,
    addAccount:    string,
    getAccounts:   string ,
    getAccount:string,
    deleteAccount:string,
    addTransaction:string,
    getTransactions:string    // expects integer id at end of url path, e.g. .../DeleteCustomer/1
}