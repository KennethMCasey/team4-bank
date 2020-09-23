import { Component, OnInit } from '@angular/core';
import {AccountService, QueryValues} from 'src/service/account.service'
import {Account} from 'src/model/Account'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})

export class AccountDetailsComponent implements OnInit
{
  public accounts:Account[]
  public form:FormGroup

ngOnInit()
{
  this.form = new FormGroup
  ({
    Id_Type: new FormControl( "",  [Validators.required]),
    id: new FormControl( "",  [Validators.required])
  })
}

 //Place Holder
 constructor(private acccountService:AccountService) 
 {
 
 }

 public getAccount(queryValue:string, accountSearchId:number) 
 {

  this.acccountService.getAccount(queryValue, accountSearchId).subscribe
  (
     (result) => 
     {
       console.log(result);
       this.accounts = result;
       if (this.accounts == null) alert("No Account Found  with Id " + accountSearchId)
     },
     (error) => 
     {
       console.log("error: " + error)
       alert("There was an error during your request:\n" + JSON.stringify(error))
     }
  )
  
 }
 

}
