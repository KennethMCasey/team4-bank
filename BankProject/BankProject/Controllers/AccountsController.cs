using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankProject.Models;
using BankProject.Repository;

namespace BankProject.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IBankRepo _repo;

        /* Constructor */
        public AccountsController(IBankRepo context)
        {
            _repo = context;
        }

        // POST: api/Accounts
        [HttpPost]
        public ActionResult<Account> PostAccount(CreateAccountModel accountCreate)
        {
            Account account = new Account(accountCreate.CustId, accountCreate.AcctType, accountCreate.Balance);

            Account acc = _repo.AddAccount(account);

            return CreatedAtAction("GetAccountsByCustomerId", new { cid = acc.CustId }, acc);
        }

        // GET: api/Accounts
        // https://banks4you.com/api/Accounts
        [HttpGet]
        public IEnumerable<Account> GetAccounts()
        {
            return _repo.GetAccounts();
        }

        // https://banks4you.com/api/Accounts/ssn/8904384
        [HttpGet("ssn/{ssn:length(9)}")]
        public IEnumerable<Account> GetAccountsBySsn(string ssn)
        {
            return _repo.GetAccountsBySsn(ssn);
        }

        // https://banks4you.com/api/Accounts/cid/7
        [HttpGet("cid/{cid:range(100000000, 1000000000)}")]
        public IEnumerable<Account> GetAccountsByCustomerId(int cid)
        {
            return _repo.GetAccountsByCustomerId(cid);
        }


        // GET https://banks4you.com/api/Accounts/aid/888
        [HttpGet("aid/{aid:range(100000000, 1000000000)}")]
        public Account GetAccountByAccountId(int aid)
        {
            return _repo.GetAccountByAccountId(aid);
        }

        // DELETE api/Accounts/aid/888
        [HttpDelete("aid/{aid}")]
        public ActionResult<Account> DeleteAccountByAccountId(int aid)
        {
            var account = _repo.DeleteAccountByAccountId(aid);
            if (account == null)
            {
                return NotFound();
            }
            return account;
        }


        // PUT: api/Accounts/5
        [HttpPut("{aid}")]
        public IActionResult PutAccount(int aid, Account account)
        {
            int retCode = _repo.UpdateAccount(aid, account);
            if (retCode != 0) // error
                return NotFound();
            return NoContent();
        }

      

        /* Private Helpers and Constants */
    }
}
