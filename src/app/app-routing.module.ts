import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountCreateComponent } from 'src/app/Executive/Account-Create/account-create.component';
import { AccountMasterComponent } from 'src/app/Executive/Account-Master/account-master.component';
import { CustomerCreateComponent } from 'src/app/Executive/Customer-Create/customer-create.component';
import { CustomerMasterComponent } from 'src/app/Executive/Customer-Master/customer-master.component';
import { CustomerUpdateComponent } from 'src/app/Executive/Customer-Update/customer-update.component';
import { LoginComponent } from 'src/app/Auth/Login/login.component';
import { AccountDepositComponent } from 'src/app/Teller/Account-Deposit/account-deposit.component';
import { AccountDetailsComponent } from 'src/app/Teller/Account-Details/account-details.component';
import { AccountStatementComponent } from 'src/app/Teller/Account-Statement/account-statement.component';
import { AccountTransferComponent } from 'src/app/Teller/Account-Transfer/account-transfer.component';
import { AccountWithdrawComponent } from 'src/app/Teller/Account-Withdraw/account-withdraw.component';
import { FourOhFourComponent } from 'src/app/404/404.component';
import { HomeComponent } from 'src/app/Home/home.component';
import { SignupComponent } from 'src/app/Auth/Sign-Up/signup.component';
import { AuthGuard } from '../service/auth/auth.guard';
import { Role } from '../model/Role';

const routes: Routes = [
  {
    path: 'Teller',
    component: AccountDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Teller] }
  },
  {
    path: 'Teller/Deposit/:id',
    component: AccountDepositComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Teller] }
  },
  {
    path: 'Teller/Statement',
    component: AccountStatementComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Teller] }
  },
  {
    path: 'Teller/Transfer/:id',
    component: AccountTransferComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Teller] }
  },
  {
    path: 'Teller/Withdraw/:id',
    component: AccountWithdrawComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Teller] }
  },

  {
    path: 'Executive/Account',
    component: AccountMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Executive] }
  },
  {
    path: 'Executive/Account/Create',
    component: AccountCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Executive] }
  },
  {
    path: 'Executive/Customer',
    component: CustomerMasterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Executive] }
  },
  {
    path: 'Executive/Customer/Create',
    component: CustomerCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Executive] }
  },
  {
    path: 'Executive/Customer/Update/:id',
    component: CustomerUpdateComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Executive] }
  },

  { path: 'Login', component: LoginComponent },
  { path: 'Sign-Up', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: FourOhFourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
