using System;
using System.Collections.Generic;
using BankProject.Models;
using BankProject.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankProject.Controllers
{
    [Authorize(Roles = UserRoles.Cashier)]
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly IBankRepo _repo;

        public TransactionsController(IBankRepo context)
        {
            _repo = context;
        }

        // api/Transactions
        [HttpPost]
        public ActionResult<Transactions> AddTransaction(Transactions transaction)
        {
            try {
                 _repo.AddTransaction(transaction);
                return NoContent();
            } catch(Exception e) {
                Console.WriteLine(e.Message);
                return StatusCode(500);
            }
           
        }

        // api/Transactions/{Account-Id}/num/{Param1}
        [HttpGet("{aid:range(100000000, 1000000000)}/num/{n:range(1,10)}")]
        public ActionResult<IEnumerable<Transactions>> GetLastN(int aid, int n)
        {
            var transactions = _repo.GetLastNTransactions(aid, n);
            if (transactions == null)
            {
                return NotFound();
            }

            return new ActionResult<IEnumerable<Transactions>>(transactions);
        }


        // api/Transactions/{Account-Id}/num/{Param1}
        [HttpGet("{aid:range(100000000, 1000000000)}/num/{startN:min(0)}/{endN:int}")]
        public ActionResult<IEnumerable<Transactions>> GetTransactionsInRange(int aid, int startN, int endN)
        {
            var transactions = _repo.GetTransactionsInRange(aid, startN, endN);
            if (transactions == null)
            {
                return NotFound();
            }
            return new ActionResult<IEnumerable<Transactions>>(transactions);
        }

        // api/Transactions/{Account-Id}/date/{Param1}/{Param2}
        [HttpGet("{aid:range(100000000, 1000000000)}/date/{startDate:datetime}/{endDate:datetime}")]
        public ActionResult<IEnumerable<Transactions>> GetTransactionsInDateRange(int aid, DateTime startDate, DateTime endDate)
        {
            var transactions = _repo.GetTransactionsInDateRange(aid, startDate, endDate);
            if (transactions == null)
            {
                return NotFound();
            }
            return new ActionResult<IEnumerable<Transactions>>(transactions);
        }

    }
}
