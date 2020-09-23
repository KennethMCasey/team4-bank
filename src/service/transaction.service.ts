import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transactions } from '../model/Transactions';
import { environment } from '../environments/environment';
import { BankApiEndpoint } from '../model/BankApiEndpoint';
import { Observable } from 'rxjs';


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
      this.apiEndpoint.Transactions,
      postTransaction,
      this.defaultOptions
    );
  }

  //https://banks4you.com/api/Transactions/{Account-Id}/{Filter-Type}/{Param1}/{Param2}
 // Get all Account (5.2.5)
  getTransactions(accountId: number, paramOne: any, paramTwo: any) {
    var filterType = (Number.isNaN(Number(paramOne))) ? "date":"num"
    return this.httpClient.get<Transactions[]>(`${this.apiEndpoint.Transactions}${accountId}/${filterType}/${paramOne}/${paramTwo}`);
  }
}

