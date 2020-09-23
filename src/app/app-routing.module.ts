import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountCreateComponent} from 'src/app/Executive/Account-Create/account-create.component'
import {AccountMasterComponent} from 'src/app/Executive/Account-Master/account-master.component'
import {CustomerCreateComponent} from 'src/app/Executive/Customer-Create/customer-create.component'
import {CustomerMasterComponent} from 'src/app/Executive/Customer-Master/customer-master.component'
import {CustomerUpdateComponent} from 'src/app/Executive/Customer-Update/customer-update.component'
import {LoginComponent} from 'src/app/Auth/Login/login.component'
import {AccountDepositComponent} from 'src/app/Teller/Account-Deposit/account-deposit.component'
import {AccountDetailsComponent} from 'src/app/Teller/Account-Details/account-details.component'
import {AccountStatementComponent} from 'src/app/Teller/Account-Statement/account-statement.component'
import {AccountTransferComponent} from 'src/app/Teller/Account-Transfer/account-transfer.component'
import {AccountWithdrawComponent} from 'src/app/Teller/Account-Withdraw/account-withdraw.component'
import {FourOhFourComponent} from 'src/app/404/404.component'
import {HomeComponent} from 'src/app/Home/home.component'
import {SignupComponent} from 'src/app/Auth/Sign-Up/signup.component'
import { from } from 'rxjs';


const routes: Routes = 
[
  {path:'Teller', component:AccountDetailsComponent},
  {path:'Teller/Deposit/:id', component:AccountDepositComponent},
  {path:'Teller/Statement', component:AccountStatementComponent},
  {path:'Teller/Transfer/:id', component:AccountTransferComponent},
  {path:'Teller/Withdraw/:id', component:AccountWithdrawComponent},

  {path:'Executive/Account', component:AccountMasterComponent},
  {path:'Executive/Account/Create', component:AccountCreateComponent},
  {path:'Executive/Customer', component:CustomerMasterComponent},
  {path:'Executive/Customer/Create', component:CustomerCreateComponent},
  {path:'Executive/Customer/Update/:id', component:CustomerUpdateComponent},

  {path:'Login', component:LoginComponent},
  {path:'Sign-Up', component:SignupComponent},
  {path:'', component:HomeComponent},
  {path:'**', component:FourOhFourComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
