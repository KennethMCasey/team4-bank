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
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IBankRepo _repo;

        public AccountsController(IBankRepo context)
        {
            _repo = context;
        }

        // GET: api/Accounts
        [HttpGet("{id}")]
        public IEnumerable<Account> GetAccounts(int id)
        {
            return _repo.GetAccounts(id);
        }
        [HttpGet]
        // GET: api/Accounts
        public IEnumerable<Account> GetAccounts()
        {
            return _repo.GetAccounts();
        }
        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public ActionResult<Account> GetAccount(int id)
        {
            var account = _repo.GetAccount(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public IActionResult PutAccount(int id, Account account)
        {
            int retCode = _repo.UpdateAccount(id, account);
            if (retCode != 0) // error
                return NotFound();

            return NoContent();
        }

        // POST: api/Accounts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<Account> PostAccount(Account account)
        {
            Account acc = _repo.AddAccount(account);

            return CreatedAtAction("GetAccount", new { id = acc.AcctId }, acc);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public ActionResult<Account> DeleteAccount(int id)
        {
            var account = _repo.DeleteAccount(id);
            if (account == null)
            {
                return NotFound();
            }
            return account;
        }

    }
}
