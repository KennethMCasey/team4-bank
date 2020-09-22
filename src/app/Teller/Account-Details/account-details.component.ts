import { Component } from '@angular/core';
import {AccountService, QueryValues} from 'src/service/account.service'
import {Account} from 'src/model/Account'

@Component({
  selector: 'app-root',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})

export class AccountDetailsComponent 
{
  public account:Account

 //Place Holder
 constructor(private acccountService:AccountService) 
 {
 
 }

 getAccount(accountSearchId:number) 
 {
  this.acccountService.getAccount(QueryValues.Acct_Id, accountSearchId).subscribe
  (
     (result) => 
     {
       this.account = result;
       if (this.account == null) alert("No Account Found  with Id " + accountSearchId)
     },
     (error) => 
     {
       alert("There was an error during your request:\n" + error)
     }
  )
 }

}
