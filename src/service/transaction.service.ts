import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transactions } from '../model/Transactions';
import { environment } from '../environments/environment';
import { BankApiEndpoint } from '../model/BankApiEndpoint';
import { Observable } from 'rxjs';

/*
 * BookAPI Service wraps communication to and from web api via HTTP
 */
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl: string;
  private apiEndpoint: BankApiEndpoint;
  private defaultOptions: any;

  constructor(private httpClient: HttpClient) {
    this.defaultOptions = { headers: { 'Content-Type': 'application/json' } };
    this.apiEndpoint = environment.apiEndpoints;
  }

  //Add a Account (5.2.2)(5.2.3)(5.2.4)
  addTransaction(postTransaction) {
    return this.httpClient.post(
      this.apiEndpoint.addTransaction,
      postTransaction,
      this.defaultOptions
    );
  }

  /*Edit one customer (5.1.3)
  editCustomer(putCustomer) {
    return this.httpClient.put(
      `${this.apiEndpoint.editCustomer}${putCustomer.Cust_Id}`,
      putCustomer,
      this.defaultOptions
    );
  }*/

 // Get all Account (5.1.8) (5.2.1)
  getTransactions() {
    return this.httpClient.get(this.apiEndpoint.getTransactions);
  }

 /*Get one Account (5.2.1) 
  getAccount(Cust_Id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.apiEndpoint.getAccount}${Cust_Id}`);
  }

 // Delete one Account (5.1.6)
  deleteAccount(Cust_Id: number) {
    return this.httpClient.delete(`${this.apiEndpoint.deleteAccount}${Cust_Id}`);
  }*/
}

