import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../model/Account';
import { environment } from '../environments/environment';
import { BankApiEndpoint } from '../model/BankApiEndpoint';
import { Observable } from 'rxjs';

/*
 * BookAPI Service wraps communication to and from web api via HTTP
 */

export enum QueryValues 
{
  Cust_Id =1 ,
   SSN=2,
   Acct_Id=3
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl: string;
  private apiEndpoint: BankApiEndpoint;
  private defaultOptions: any;

  constructor(private httpClient: HttpClient) {
    this.defaultOptions = { headers: { 'Content-Type': 'application/json' } };
    this.apiEndpoint = environment.apiEndpoints;
  }

  //Add a Account (5.1.5)
  addAccount(postAccount) {
    return this.httpClient.post(
      this.apiEndpoint.Accounts,
      postAccount,
      this.defaultOptions
    );
  }

 // Get all Account (5.1.8) (5.2.1)
  getAccounts() {
    return this.httpClient.get<Account[]>(this.apiEndpoint.Accounts);
  }

 // Get one or more Account (5.2.1) 
  getAccount(queryValue: string,id:number): Observable<Account[]> 
  {
    if (queryValue == "Customer ID") queryValue = "cid"
    if (queryValue == "SSN ID") queryValue = "ssn"
    if (queryValue == "Account ID") queryValue = "aid"
    if (queryValue == "cid" || queryValue == "ssn" || queryValue == "aid")
    return this.httpClient.get<Account[]>(`${this.apiEndpoint.Accounts}${queryValue}/${id}`);
    else return null
  }

 // Delete one Account (5.1.6)
  deleteAccount(Cust_Id: number) {
    return this.httpClient.delete(`${this.apiEndpoint.Accounts}${Cust_Id}`);
  }
}
