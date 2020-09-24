import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/model/Account';
import { AccountService } from 'src/service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './account-master.component.html',
  styleUrls: ['./account-master.component.css'],
})
export class AccountMasterComponent implements OnInit {
  public accountList: Account[];
  public hasError: boolean;
  public inProg: boolean;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountList = null;
    this.hasError = false;
    this.inProg = true
    this.accountService.getAccounts().subscribe(
      (result) => {
        this.inProg = false
        console.log('result:' + result);
        this.accountList = result;
      },
      (error) => {
        this.inProg = false
        console.log('error:' + error);
        alert('Error in fetching Accounts.\nInfo: ' + error);
      }
    );
  }

  deleteAccount(accountId: number) {
    this.inProg = true
    if (confirm('Are you sure you want to delete this entry?')) {
      this.accountService.deleteAccount(accountId).subscribe(
        (res) => {
          this.inProg = false
          alert('Account deleted!');
          this.ngOnInit();
        },
        (error) => {
          this.inProg = false
          console.log(JSON.stringify(error));
          alert('Error: Not Deleted');
        }
      );
    }
  }
}
