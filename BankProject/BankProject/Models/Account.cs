using System;
using System.Collections.Generic;

namespace BankProject.Models
{
    public partial class Account
    {
        public int AcctId { get; set; }
        public int? CustId { get; set; }
        public string AcctType { get; set; }
        public decimal? Balance { get; set; }
        public DateTime? CrDate { get; set; }
        public DateTime? TrLastDate { get; set; }
        public int? Duration { get; set; }

        public virtual Customer Cust { get; set; }
    }
}
