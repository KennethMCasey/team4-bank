using System;
using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace BankProject.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Account = new HashSet<Account>();
            Transactions = new HashSet<Transactions>();
        }

        public int CustId { get; set; }
        public string Ssn { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public decimal? Age { get; set; }

        [JsonIgnore]
        public virtual ICollection<Account> Account { get; set; }
        [JsonIgnore]
        public virtual ICollection<Transactions> Transactions { get; set; }
    }
}
