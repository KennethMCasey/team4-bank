import { Component } from '@angular/core';
import { Transactions } from 'src/model/Transactions';
import {TransactionService} from 'src/service/transaction.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-Account-Deposit',
  templateUrl: './account-deposit.component.html',
  styleUrls: ['./account-deposit.component.css']
})

export class AccountDepositComponent 
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
