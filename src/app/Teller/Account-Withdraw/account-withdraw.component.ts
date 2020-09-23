import { Component, OnInit } from '@angular/core';
import {TransactionService} from 'src/service/transaction.service'
import {Transactions} from 'src/model/Transactions'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Account} from 'src/model/Account'
import {AccountService} from 'src/service/account.service'
import {Router, ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './account-withdraw.component.html',
  styleUrls: ['./account-withdraw.component.css']
})

export class AccountWithdrawComponent implements OnInit
{
  form:FormGroup
  account:Account

  ngOnInit()
  {
    this.form = new FormGroup
    ({
      amount: new FormControl( "",  [Validators.required, Validators.max(99999999999999999999), Validators.min(0)])
    })
  }

  public getNewBalance()
{
  return this.account.Balance - ( Number.isNaN(Number.parseInt(this.form.get('amount').value))? 0 : Number.parseInt(this.form.get('amount').value))
}

  constructor(private transactionService:TransactionService, private router:Router, private accountService:AccountService, private route:ActivatedRoute) 
  {
    this.account= 
    {
      Acct_Id:66,
      Cust_Id:66, 
      Acct_Type:"saving",
      Balance:66,
      CR_Date:"8",
      TR_Last_Date:"8",
      Duration:8
      }
    accountService.getAccount("Account ID" ,Number.parseInt(route.snapshot.paramMap.get('id'))).subscribe
    (
      (result) => this.account = result[0],
      (error) => alert("could not get account, go back here")
    )
  }

  public transaction:Transactions

  public postTransaction() 
  {
    this.transaction = new Transactions()
    this.transaction.Source_Acct = this.account.Acct_Id
    this.transaction.Cust_Id = this.account.Cust_Id
    this.transaction.Amount = this.form.get('amount').value
    console.log(this.transaction)

    this.inProgress(true)
    this.transactionService.addTransaction(this.transaction).subscribe( (success) => {this.inProgress(false); alert("The transaction has been posted successfully."); this.router.navigateByUrl('/') }, (error) => {this.inProgress(false); alert("There was an error:\n" + JSON.stringify(error))} )
  }

  private inProgress(yesno:boolean) 
  {
    //update UI Here
  }
}
