import { Component } from '@angular/core';
import {AccountService} from 'src/service/account.service'
import {Router} from '@angular/router'
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Account } from 'src/model/Account';

@Component({
  selector: 'app-root',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent

{
form: FormGroup

  public account:Account

  constructor(private accountService:AccountService, private router:Router) 
  
  {
      // this.form = new FormGroup({
      //   Acct_Type: new FormControl('', Validators.required)
      // });
  }
 
  ngOnInit() {
    this.form = new FormGroup({
      depositAmount: new FormControl("", [Validators.required, Validators.max(99999999999999999999), Validators.min(0)]),
      customerID: new FormControl("", [Validators.required]),
      Acct_Type: new FormControl("", [Validators.required])
    });
  }
  public postAccount() 
  {
    this.operationInProgress(true)

    this.account = new Account()
    this.account.Cust_Id = this.form.get('customerID').value
    this.account.Balance = this.form.get('depositAmount').value
    this.account.Acct_Type = this.form.get('Acct_Type').value
    console.log(this.account)

    this.accountService.addAccount(this.account).subscribe((response) =>{this.operationInProgress(false);  this.operationComplete(true, null); this.router.navigateByUrl('/')}, (error) => { this.operationInProgress(false); this.operationComplete(false, JSON.stringify(error))})
  }

  private operationInProgress(yesno:Boolean) 
  {
      //update UI
  }

  private operationComplete(success:Boolean, message:string)
  {
    alert("The Operation Was " + (success ? "" : "Not " + "Successful.") + (message == null ? "" : ("\nInfo: " + message))) 
  }

}
