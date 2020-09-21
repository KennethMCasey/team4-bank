import { Component } from '@angular/core';
import {AccountService, QueryValues} from 'src/service/account.service'

@Component({
  selector: 'app-root',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})

export class AccountDetailsComponent 
{
 //Place Holder
 AccountDetailsComponent(acccountService:AccountService) 
 {
     acccountService.getAccount(QueryValues.Acct_Id, 8987)
 }

}
