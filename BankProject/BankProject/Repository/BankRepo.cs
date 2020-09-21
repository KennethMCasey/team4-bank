using BankProject.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankProject.Repository
{
    public class BankRepo : IBankRepo
    {
        private enum ReturnCode
        {
            NO_CONTENT,
            NOT_FOUND
        }

        private readonly Team4_BankDBContext _context;

        public BankRepo(Team4_BankDBContext context)
        {
            _context = context;
        }

        public Account AddAccount(Account account)
        {
            _context.Account.Add(account);
            _context.SaveChanges();

            return account;
        }

        public Customer AddCustomer(Customer customer)
        {
            _context.Customer.Add(customer);
            _context.SaveChangesAsync();

            return customer;
        }

        public Account DeleteAccount(int acctId)
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

        public Transactions ExecuteTransaction(Transactions transaction)
        {
            if (transaction.TargetAcct != null)
            {
                var target = GetAccount((int)transaction.TargetAcct);
                target.Balance -= transaction.Amount;
            }
            var source = GetAccount(transaction.SourceAcct);
            source.Balance += transaction.Amount;

            return transaction;
        }

        public IEnumerable<Transactions> GetTransactions(int id)
        {
            return _context.Transactions.Where(c => c.CustId.Equals(id)).AsEnumerable();
        }
        public IEnumerable<Account> GetAccounts()
        {
            return _context.Account.AsEnumerable();
        }
        public Account GetAccount(int acctId)
        {
            var account = _context.Account.Find(acctId);

            if (account == null)
            {
                return null;
            }

            return account;
        }

        public IEnumerable<Account> GetAccounts(int custId)
        {
            return _context.Account.Where(c => c.CustId.Equals(custId)).AsEnumerable();
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
        private bool AccountExists(int id)
        {
            return _context.Account.Any(e => e.AcctId == id);
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.CustId == id);
        }
    }
}
