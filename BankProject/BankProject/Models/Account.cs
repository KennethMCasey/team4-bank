using System;
using System.Collections.Generic;

namespace BankProject.Models
{
    public partial class Account
    {
        public Account()
        {
            TransactionsSourceAcctNavigation = new HashSet<Transactions>();
            TransactionsTargetAcctNavigation = new HashSet<Transactions>();
        }

        public Account(int custId, string acctType, decimal? balance)
        {
            CustId = custId;
            AcctType = acctType;
            Balance = balance;
        }

        public int AcctId { get; set; }
        public int CustId { get; set; }
        public string AcctType { get; set; }
        public decimal? Balance { get; set; }
        public DateTime CrDate { get; set; }
        public DateTime? TrLastDate { get; set; }
        public string Duration { get; set; }

        public virtual Customer Cust { get; set; }
        public virtual ICollection<Transactions> TransactionsSourceAcctNavigation { get; set; }
        public virtual ICollection<Transactions> TransactionsTargetAcctNavigation { get; set; }
    }
}
