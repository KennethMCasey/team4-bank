import { Component } from '@angular/core';
import {TransactionService} from 'src/service/transaction.service'
import {Router} from '@angular/router'
import {Transactions} from 'src/model/Transactions'

@Component({
  selector: 'app-root',
  templateUrl: './account-withdraw.component.html',
  styleUrls: ['./account-withdraw.component.css']
})

export class AccountWithdrawComponent 
{
  constructor(private transactionService:TransactionService, private router:Router) 
  {

  }

  public transaction:Transactions

  public postTransaction() 
  {
    this.inProgress(true)
    this.transactionService.addTransaction(this.transaction).subscribe( (success) => {this.inProgress(false); alert("The transaction has been posted successfully."); this.router.navigateByUrl('/') }, (error) => {this.inProgress(false); alert("There was an error:\n" + error)} )
  }

  private inProgress(yesno:boolean) 
  {
    //update UI Here
  }
}
