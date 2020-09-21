using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankProject.Models;
using BankProject.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly IBankRepo _repo;

        public TransactionsController(IBankRepo context)
        {
            _repo = context;
        }
        //https://banks4you.com/api/Transactions/*Account-Id*/*Filter-Type*/*Param1*/*Param2*
        [HttpGet("{id}")]
        public IEnumerable<Transactions> GetTransactions(int id)
        {
            //var transactions = _repo.Customer.Include(t => t.Transactions).AsEnumerable();

            return _repo.GetTransactions(id);
        }
        [HttpPost]
        public Transactions ExecuteTransaction(Transactions transaction)
        {
            var tran = _repo.ExecuteTransaction(transaction);
            return tran;
        }
    }
}
