import { Component } from '@angular/core';
import { from } from 'rxjs';
import {TransactionService} from 'src/service/transaction.service'
import {Router} from '@angular/router'
import {Transactions} from 'src/model/Transactions'

@Component({
  selector: 'app-root',
  templateUrl: './account-transfer.component.html',
  styleUrls: ['./account-transfer.component.css']
})

export class AccountTransferComponent 
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
