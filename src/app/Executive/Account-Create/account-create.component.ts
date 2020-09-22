import { Component } from '@angular/core';
import {AccountService} from 'src/service/account.service'
import {Router} from '@angular/router'
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

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
      this.form = new FormGroup({
        Acct_Type: new FormControl('', Validators.required)
      });
  }

  public postAccount() 
  {
    this.operationInProgress(true)
    this.accountService.addAccount(this.account).subscribe((response) =>{this.operationInProgress(false);  this.operationComplete(true, null); this.router.navigateByUrl('/')}, (error) => { this.operationInProgress(false); this.operationComplete(false, error)})
  }

  private operationInProgress(yesno:Boolean) 
  {
      //update UI
  }

  private operationComplete(success:Boolean, message:string)
  {
    alert("The Operation Was " + success ? "" : "Not " + "Successful." + message == null ? "" : ("\nInfo: " + message)) 
  }

}
