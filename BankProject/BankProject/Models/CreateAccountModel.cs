using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankProject.Models
{
    public class CreateAccountModel
    {
        public int CustId { get; set; }
        public string AcctType { get; set; }
        public decimal? Balance { get; set; }
    }
}
