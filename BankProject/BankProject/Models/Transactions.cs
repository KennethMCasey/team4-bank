using System;
using System.Collections.Generic;

namespace BankProject.Models
{
    public partial class Transactions
    {
        public int TId { get; set; }
        public int CustId { get; set; }
        public decimal? Amount { get; set; }
        public DateTime TranDate { get; set; }
        public int? SourceAcct { get; set; }
        public int? TargetAcct { get; set; }

        public virtual Customer Cust { get; set; }
        public virtual Account SourceAcctNavigation { get; set; }
        public virtual Account TargetAcctNavigation { get; set; }
    }
}
