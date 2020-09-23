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

    this.targetAccount =
          {
            Acct_Id: 66,
            Cust_Id: 66,
            Acct_Type: "saving",
            Balance: 66,
            CR_Date: "8",
            TR_Last_Date: "8",
            Duration: 8
          }
    this.sourceAccount =
    {
      Acct_Id: 66,
      Cust_Id: 66,
      Acct_Type: "saving",
      Balance: 66,
      CR_Date: "8",
      TR_Last_Date: "8",
      Duration: 8
    }
    accountService.getAccount("Account ID", Number.parseInt(route.snapshot.paramMap.get('id'))).subscribe
      (
        (result) => this.sourceAccount = result[0],
        (error) => alert("could not get account, go back here")
      )
  }

  public transaction: Transactions

  public getNewBalance(str: string) {
    if (str == "source") return this.sourceAccount.Balance - (Number.isNaN(Number.parseInt(this.form.get('amount').value)) ? 0 : Number.parseInt(this.form.get('amount').value))
    if (str == "target") return this.sourceAccount.Balance + (Number.isNaN(Number.parseInt(this.form.get('amount').value)) ? 0 : Number.parseInt(this.form.get('amount').value))
  }


  public getTargetAccount() {
    this.accountService.getAccount("Account ID", Number.parseInt(this.form.get('target').value)).subscribe
      (
        (result) => this.sourceAccount = result[0],
        (error) => {
          alert("could not get account, go back here")
          this.targetAccount =
          {
            Acct_Id: 66,
            Cust_Id: 66,
            Acct_Type: "saving",
            Balance: 66,
            CR_Date: "8",
            TR_Last_Date: "8",
            Duration: 8
          }
        }
      )

  }
  public postTransaction() {
    this.inProgress(true)
    this.transaction = new Transactions()
    this.transaction.Source_Acct = this.sourceAccount.Acct_Id
    this.transaction.Target_Acct = this.form.get('target').value
    this.transaction.Amount = this.form.get('amount').value
    console.log(this.transaction)

    this.transactionService.addTransaction(this.transaction).subscribe((success) => { this.inProgress(false); alert("The transaction has been posted successfully."); this.router.navigateByUrl('/') }, (error) => { this.inProgress(false); alert("There was an error:\n" + JSON.stringify(error)) })
  }

  private inProgress(yesno: boolean) {
    //update UI Here
  }
}
