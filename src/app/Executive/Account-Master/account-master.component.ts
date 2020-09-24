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

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountList = null;
    this.hasError = false;
    this.accountService.getAccounts().subscribe(
      (result) => {
        console.log('result:' + result);
        this.accountList = result;
      },
      (error) => {
        console.log('error:' + error);
        alert('Error in fetching Accounts.\nInfo: ' + error);
      }
    );
  }

  deleteAccount(accountId: number) {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.accountService.deleteAccount(accountId).subscribe(
        (res) => {
          alert('Account deleted!');
          this.ngOnInit();
        },
        (error) => {
          console.log(JSON.stringify(error));
          alert('Error: Not Deleted');
        }
      );
    }
  }
}
