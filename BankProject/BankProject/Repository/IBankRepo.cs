using BankProject.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace BankProject.Repository
{
    public interface IBankRepo
    {
        /* Customer Controls */
        DateTime? GetCustomerUpdate(int cid);
        Customer AddCustomer(Customer customer);
        int UpdateCustomer(int custId, Customer customer);
        Customer DeleteCustomer(int custId);
        Customer GetCustomer(int custId);
        IEnumerable<Customer> GetCustomers();

        /* Account Controls */
        Account AddAccount(Account account);
        int UpdateAccount(int acctId, Account account);
        Account DeleteAccountByAccountId(int acctId);
        Account GetAccountByAccountId(int acctId);
        IEnumerable<Account> GetAccountsByCustomerId(int custId);
        IEnumerable<Account> GetAccountsBySsn(string ssn);
        IEnumerable<Account> GetAccounts();

        /* Transaction Controls */
        Transactions AddTransaction(Transactions transactions);
        IEnumerable<Transactions> GetTransactionByAccountId(int aid);
        IEnumerable<Transactions> GetLastNTransactions(int aid, int n);
        IEnumerable<Transactions> GetTransactionsInRange(int aid, int startDate, int endDate);
        IEnumerable<Transactions> GetTransactionsInDateRange(int aid, DateTime startDate, DateTime endDate); 
        
    }
}
