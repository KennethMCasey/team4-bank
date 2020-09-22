import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/Account';
import { TransactionService } from 'src/app/service/transaction.service.ts';
import { Transactions } from 'src/model/Transactions';

@Component({
  selector: 'app-Account-Statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})

export class AccountStatementComponent implements OnInit 
{
  public transaction: Transactions[];

  ngOnInit(): void {
    this.getTransactions();
  }
  getTransactions() {
    this.service.getAccount().subscribe( transaction => {
        this.books = book as Transactions[];
        this.books.sort((a,b) => a.id - b.id );
    });
 
}
