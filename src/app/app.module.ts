import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AccountCreateComponent} from 'src/app/Executive/Account-Create/account-create.component'
import {AccountMasterComponent} from 'src/app/Executive/Account-Master/account-master.component'
import {CustomerCreateComponent} from 'src/app/Executive/Customer-Create/customer-create.component'
import {CustomerMasterComponent} from 'src/app/Executive/Customer-Master/customer-master.component'
import {CustomerUpdateComponent} from 'src/app/Executive/Customer-Update/customer-update.component'
import {LoginComponent} from 'src/app/Login/login.component'
import {AccountDepositeComponent} from 'src/app/Teller/Account-Deposit/account-deposite.component'
import {AccountDetailsComponent} from 'src/app/Teller/Account-Details/account-details.component'
import {AccountStatementComponent} from 'src/app/Teller/Account-Statement/account-statement.component'
import {AccountTransferComponent} from 'src/app/Teller/Account-Transfer/account-transfer.component'
import {AccountWithdrawComponent} from 'src/app/Teller/Account-Withdraw/account-withdraw.component'

@NgModule({
  declarations: 
  [
    AppComponent,
    AccountMasterComponent,
    AccountCreateComponent,
    CustomerCreateComponent,
    CustomerMasterComponent,
    CustomerUpdateComponent,
    LoginComponent,
    AccountDepositeComponent,
    AccountDetailsComponent,
    AccountStatementComponent,
    AccountTransferComponent,
    AccountWithdrawComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
