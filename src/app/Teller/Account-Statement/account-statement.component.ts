import { Component } from '@angular/core';
import { TransactionService } from 'src/service/transaction.service';
import { Transactions } from 'src/model/Transactions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-Account-Statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})

export class AccountStatementComponent 
{
  public transactions: Transactions[];

  constructor(private transactionService:TransactionService, private route:ActivatedRoute ) 
  {

  }

  public form:FormGroup
  ngOnInit()
  {
    this.form = new FormGroup
    ({
      QueryType_num: new FormControl( ""),
      QueryType_date: new FormControl( ""),
      Num1: new FormControl( ""),
      Num2: new FormControl( ""),
      Date1: new FormControl( ""),
      Date2: new FormControl( ""),
      Acct_Id: new FormControl( "",  [Validators.required])
    })
  }
 
  getTransaction()
  {
    this.inProgress(true)
    if (this.selectedLink == 'By Date') 
    {
    if (this.form.get('Date1').value == "" || this.form.get('Date2').value == "") {alert("please fill out date number fields"); return}
    this.transactionService.getTransactions(Number.parseInt(this.form.get('Acct_Id').value), this.form.get('Date1').value, this.form.get('Date2').value ).subscribe
    (
     
      (response) => {console.log(response); this.inProgress(false); this.transactions = response},
      (error) => {this.inProgress(false); alert("Date Error: " + JSON.stringify(error))}
    )
    }
    if (this.selectedLink == 'By Transactions') 
    {
      console.log("Log:" + this.form.get('Num1').value)
    if (this.form.get('Num1').value == ""|| this.form.get('Num2').value == "") {alert("please fill out all number fields"); return}
    this.transactionService.getTransactions(Number.parseInt(this.form.get('Acct_Id').value), Number.parseInt(this.form.get('Num1').value), Number.parseInt( this.form.get('Num2').value )).subscribe
    (
      (response) => {console.log(response); this.inProgress(false); this.transactions = response},
      (error) => {this.inProgress(false); alert("Num Error: " + JSON.stringify(error))}
    )
    }
  }
   

  private inProgress(yesno:boolean) 
  {

  }

  getTransactionsFilterDate(accountId:number, paramOne:string, paramTwo:string) 
  {
    this.inProgress(true);
    this.inProgress(true)
    this.transactionService.getTransactions(accountId, paramOne, paramTwo).subscribe( 
      (response) =>{console.log(response);  this.inProgress(false); this.transactions = response}), 
      (error) =>{this.inProgress(false); alert("There has been an error: " + error)}
  }

  getTransactionsFilterNumber(accountId:number, paramOne:number, paramTwo:number) 
  {
    this.inProgress(true)
    this.transactionService.getTransactions(accountId, paramOne, paramTwo).subscribe(
       (response) => {this.inProgress(false); console.log(response); this.transactions = response }, 
       (error) => {this.inProgress(false); console.log(error); alert("There has been an error: " + error)})
  }


  private selectedLink: string="By Transactions";        
  
  setradio(e: string): void   
{  

      this.selectedLink = e;  
        
}  

  isSelected(name: string): boolean   
{  

      if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
          return false;  
}  

      return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }
 
}
