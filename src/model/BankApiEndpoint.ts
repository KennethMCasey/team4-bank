export interface BankApiEndpoint {
    Customers:    string,     // expects Customer shaped JSON object in the body
    Accounts:     string,
    Transactions: string    // expects integer id at end of url path, e.g. .../DeleteCustomer/1
}