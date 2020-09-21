﻿using System;
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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IBankRepo _repo;

        public CustomersController(IBankRepo repo)
        {
            _repo = repo;
        }

        // GET: api/Customers
        [HttpGet]
        public IEnumerable<Customer> GetCustomers()
        {
            return _repo.GetCustomers();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public ActionResult<Customer> GetCustomer(int id)
        {
            var customer = _repo.GetCustomer(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public IActionResult PutCustomer(int id, Customer customer)
        {
            int retCode = _repo.UpdateCustomer(id, customer);
            if (retCode != 0) // error
                return NotFound();

            return NoContent();
        }

        // POST: api/Customers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public ActionResult<Customer> PostCustomer(Customer customer)
        {
            Customer cust = _repo.AddCustomer(customer);

            return CreatedAtAction("GetCustomer", new { id = cust.CustId }, cust);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public ActionResult<Customer> DeleteCustomer(int id)
        {
            var customer = _repo.DeleteCustomer(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }


    }
}
