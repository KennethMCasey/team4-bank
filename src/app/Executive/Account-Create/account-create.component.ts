import { Component } from '@angular/core';
import { AccountService } from 'src/service/account.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Account } from 'src/model/Account';

@Component({
  selector: 'app-root',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css'],
})
export class AccountCreateComponent {
  form: FormGroup;

  public account: Account;

  constructor(private accountService: AccountService, private router: Router) {
    // this.form = new FormGroup({
    //   Acct_Type: new FormControl('', Validators.required)
    // });
  }

  ngOnInit() {
    this.form = new FormGroup({
      depositAmount: new FormControl('', [
        Validators.required,
        Validators.max(99999999999999999999),
        Validators.min(0),
      ]),
      customerID: new FormControl('', [Validators.required]),
      Acct_Type: new FormControl('', [Validators.required]),
    });
  }
  public postAccount() {
    this.operationInProgress(true);

    this.account = new Account();
    this.account.custId = this.form.get('customerID').value;
    this.account.balance = this.form.get('depositAmount').value;
    this.account.acctType = this.form.get('Acct_Type').value;
    console.log('Account:' + JSON.stringify(this.account));

    this.accountService.addAccount(this.account).subscribe(
      (response) => {
        console.log('response: ' + response);
        this.operationInProgress(false);
        this.operationComplete(true, null);
        this.router.navigateByUrl('/Executive/Account');
      },
      (error) => {
        console.log('error:' + error);
        this.operationInProgress(false);
        this.operationComplete(false, JSON.stringify(error));
      }
    );
  }

  private operationInProgress(yesno: Boolean) {
    //update UI
  }

  private operationComplete(success: Boolean, message: string) {
    alert(
      'The Operation Was ' +
        (success ? '' : 'Not ' + 'Successful.') +
        (message == null ? '' : '\nInfo: ' + message)
    );
  }
}
