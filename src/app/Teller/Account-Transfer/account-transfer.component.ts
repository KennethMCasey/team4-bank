import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { TransactionService } from 'src/service/transaction.service'
import { Transactions } from 'src/model/Transactions'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from 'src/model/Account'
import { AccountService } from 'src/service/account.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './account-transfer.component.html',
  styleUrls: ['./account-transfer.component.css']
})

export class AccountTransferComponent implements OnInit {

  public inProg:boolean
  public form: FormGroup
  public sourceAccount: Account
  public targetAccount: Account

  ngOnInit() {
    this.form = new FormGroup
      ({
        amount: new FormControl("", [Validators.required, Validators.max(99999999999999999999), Validators.min(0)]),
        target: new FormControl("", [Validators.required])
      })
  }

  constructor(private transactionService: TransactionService, private router: Router, private accountService: AccountService, private route: ActivatedRoute) {

    accountService.getAccount("Account ID", Number.parseInt(route.snapshot.paramMap.get('id'))).subscribe
      (
        (result) => this.sourceAccount = result[0],
        (error) => alert("could not get account, go back here")
      )
  }

  public transaction: Transactions

  public getNewBalance(str: string) {
    console.log(this.targetAccount.balance);
    console.log(Number.parseInt(this.form.get('amount').value)); 
    if (str == "source") 
      return this.sourceAccount.balance - 
      (
        Number.isNaN(Number.parseInt(this.form.get('amount').value)) 
        ? 0 : Number.parseInt(this.form.get('amount').value)
      )
    if (str == "target") {
      return this.targetAccount.balance +
      (
        Number.isNaN(Number.parseInt(this.form.get('amount').value)) 
        ? 0  : Number.parseInt(this.form.get('amount').value)
      )
    }
  }
  


  public getTargetAccount() {
    this.accountService.getAccount("Account ID", Number.parseInt(this.form.get('target').value)).subscribe
      (
        (result) => this.targetAccount = result[0],
        (error) => {
          console.log("error: " + error)
          alert("could not get account, go back here")
       
        }
      )

  }
  public postTransaction() {
    if (this.sourceAccount == null) {alert("fatal error: source account null"); return}
    this.inProgress(true)
    this.transaction = new Transactions()
    this.transaction.sourceAcct = this.sourceAccount.acctId
    this.transaction.targetAcct = this.form.get('target').value
    this.transaction.amount = this.form.get('amount').value
    this.transaction.custId = this.sourceAccount.custId;
    console.log(this.transaction)

    this.transactionService.addTransaction(this.transaction).subscribe(
       (success) => {console.log(success); this.inProgress(false); alert("The transaction has been posted successfully."); this.router.navigateByUrl('/Teller') }, 
       (error) => {console.log(error); this.inProgress(false); alert("There was an error:\n" + JSON.stringify(error))} )
  }

  private inProgress(yesno: boolean) 
  {
    this.inProg = yesno
  }
}
