using System.Runtime;
using BankProject.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BankProject.Repository
{
    public class BankRepo : IBankRepo
    {

        private readonly Team4_BankDBContext _context;

        /* Constructor */
        public BankRepo(Team4_BankDBContext context)
        {
            _context = context;
        }

        /* Customer Controls */


        public DateTime? GetCustomerUpdate(int cid)
        {
            //         	@custId int,
            // @mostRecentDate datetime OUT
            SqlParameter[] @params = {
                new SqlParameter("@custId", cid)
            };


            _context.Database.ExecuteSqlCommand(
                "exec @returnVal= dbo.sp_getLastTransactionDateForCustomer @custId", @params);
            Console.WriteLine((DateTime)@params[0].Value);
            return (DateTime)@params[0].Value; //result is 29 
            //return _context.Database.SqlQuery<DateTime>("sp_getLastTransactionDateForCustomer", cid);
        }

        public Customer AddCustomer(Customer customer)
        {
            _context.Customer.Add(customer);
            _context.SaveChanges();

            return customer;
        }

        public int UpdateCustomer(int custId, Customer customer)
        {
            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                _context.Customer.Update(customer);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(custId))
                    return (int)ReturnCode.NOT_FOUND;
                else
                    throw;
            }
            return (int)ReturnCode.NO_CONTENT;
        }

        public Customer DeleteCustomer(int custId)
        {
            var customer = _context.Customer.Find(custId);
            if (customer == null)
            {
                return null;
            }

            _context.Customer.Remove(customer);
            _context.SaveChanges();
            return customer;
        }


        public Customer GetCustomer(int custId)
        {
            var customer = _context.Customer.Find(custId);

            return customer;
        }

        public IEnumerable<Customer> GetCustomers()
        {
            return _context.Customer.ToList();
        }

        /* Account Controls */
        public Account AddAccount(Account account)
        {
            _context.Account.Add(account);
            _context.SaveChanges();

            return account;
        }

        public int UpdateAccount(int acctId, Account account)
        {
            _context.Entry(account).State = EntityState.Modified;

            try
            {
                _context.Account.Update(account);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(acctId))
                    return (int)ReturnCode.NOT_FOUND;
                else
                    throw;
            }
            return (int)ReturnCode.NO_CONTENT;
        }


        public Account DeleteAccountByAccountId(int acctId)
        {
            var account = _context.Account.Find(acctId);
            if (account == null)
            {
                return null;
            }

            _context.Account.Remove(account);
            _context.SaveChanges();
            return account;
        }

        public Account GetAccountByAccountId(int acctId)
        {
            var account = _context.Account.FirstOrDefault(account => account.AcctId == acctId);

            if (account == null)
            {
                return null;
            }

            return account;
        }

        public IEnumerable<Account> GetAccountsByCustomerId(int customerId)
        {
            var customer = _context
                .Customer
                    .Include("Account")
                    .FirstOrDefault(c => c.CustId == customerId);

            if (customer == null || customer.Account == null)
            {
                return null;
            }

            return customer.Account;
        }

        public IEnumerable<Account> GetAccountsBySsn(string ssn)
        {
            var customer = _context
                .Customer
                    .Include("Account")
                    .FirstOrDefault(c => c.Ssn == ssn);

            if (customer == null || customer.Account == null)
            {
                return null;
            }

            return customer.Account;
        }

        public IEnumerable<Account> GetAccounts(int custId)
        {
            return _context.Account.Where(c => c.CustId.Equals(custId)).AsEnumerable();
        }

        public IEnumerable<Account> GetAccounts()
        {
            return _context.Account.AsEnumerable();
        }

        /* Transaction Controls */
        public Transactions AddTransaction(Transactions transaction)
        {
            _context.Add(transaction);
            _context.SaveChanges();
            // transfer
            if (transaction.TargetAcct != null)
            {
                var source = GetAccountByAccountId(transaction.SourceAcct);
                source.Balance -= transaction.Amount;
                var target = GetAccountByAccountId((int)transaction.TargetAcct);
                target.Balance += transaction.Amount;
                UpdateAccount(transaction.SourceAcct, source);
                UpdateAccount((int)transaction.TargetAcct, target);
            }
            else // deposit or withdrawal
            {
                var source = GetAccountByAccountId(transaction.SourceAcct);
                source.Balance += transaction.Amount;
                UpdateAccount(transaction.SourceAcct, source);
            }
            return transaction;
        }

        public IEnumerable<Transactions> GetTransactionByAccountId(int aid)
        {
            return _context.Transactions
                .Where(t => t.SourceAcct == aid || t.TargetAcct == aid)
                .AsEnumerable();
        }

        public IEnumerable<Transactions> GetLastNTransactions(int aid, int n)
        {
            // want to get the N most recent transactions
            return _context.Transactions
                    .Where(t => t.SourceAcct == aid || t.TargetAcct == aid)
                    .OrderByDescending(t => t.TranDate)
                    .Take(n)
                    .ToList();
        }

        public IEnumerable<Transactions> GetTransactionsInRange(int aid, int startN, int endN)
        {
            // want to get the most recent transactions in range startN to endN
            return _context.Transactions
                    .Where(t => t.SourceAcct == aid || t.TargetAcct == aid)
                    .OrderByDescending(t => t.TranDate)
                    .Skip(startN - 1)
                    .Take(endN - startN + 1)
                    .ToList();
        }

        // returns transactions involving this account
        // from startDate to endDate inclusive
        public IEnumerable<Transactions> GetTransactionsInDateRange(int aid, DateTime startDate, DateTime endDate)
        {
            return _context.Transactions
                    .Where(t =>
                        (t.SourceAcct == aid || t.TargetAcct == aid)
                        && startDate <= t.TranDate
                        && t.TranDate <= endDate
                    ).ToList();
        }

        /* Private Helpers */
        private bool AccountExists(int id)
        {
            return _context.Account.Any(e => e.AcctId == id);
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.CustId == id);
        }
        private enum ReturnCode
        {
            NO_CONTENT,
            NOT_FOUND
        }
    }
}
