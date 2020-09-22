import { Component } from '@angular/core';
import { TransactionService } from 'src/service/transaction.service';
import { Transactions } from 'src/model/Transactions';


@Component({
  selector: 'app-Account-Statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})

export class AccountStatementComponent 
{
  public transactions: Transactions[];

  constructor(private transactionService:TransactionService, ) 
  {

  }
 
  private inProgress(yesno:boolean) 
  {

  }

  getTransactionsFilterDate(accountId:number, paramOne:string, paramTwo:string) 
  {
    this.inProgress(true)
    this.transactionService.getTransactions(accountId, paramOne, paramTwo).subscribe( (response) => this.transactions = response), (error) => alert("There has been an error: " + error)
  }

  getTransactionsFilterNumber(accountId:number, paramOne:number, paramTwo:number) 
  {
    this.inProgress(true)
    this.transactionService.getTransactions(accountId, paramOne, paramTwo).subscribe( (response) => {this.inProgress(false); this.transactions = response }, (error) => {this.inProgress(false); alert("There has been an error: " + error)})
  }
 
}
