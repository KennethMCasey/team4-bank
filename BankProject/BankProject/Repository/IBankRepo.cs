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
        Customer AddCustomer(Customer customer);
        Customer DeleteCustomer(int custId);
        Customer GetCustomer(int custId);
        IEnumerable<Customer> GetCustomers();
        int UpdateCustomer(int custId, Customer customer);

        IEnumerable<Transactions> GetTransactions(int id);
        Transactions ExecuteTransaction(Transactions transactions);

        Account AddAccount(Account account);
        Account DeleteAccount(int acctId);
        Account GetAccount(int acctId);
        IEnumerable<Account> GetAccounts(int custId);
        IEnumerable<Account> GetAccounts();
        int UpdateAccount(int acctId, Account account);

        
    }
}
