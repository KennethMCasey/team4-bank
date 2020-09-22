import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/model/Account';
import {AccountService} from 'src/service/account.service'

@Component({
  selector: 'app-root',
  templateUrl: './account-master.component.html',
  styleUrls: ['./account-master.component.css']
})
export class AccountMasterComponent
{
  public accountList:Account[]
  public hasError:boolean

  constructor(private accountService:AccountService)
  {
    this.accountList = null
    this.hasError = false
    accountService.getAccounts().subscribe((result) => {this.accountList = result}, (error) => {alert("Error in fetching Accounts.\nInfo: " + error)})
  }
}
