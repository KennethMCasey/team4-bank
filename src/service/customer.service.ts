import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/Customer';
import { environment } from '../environments/environment';
import { BankApiEndpoint } from '../model/BankApiEndpoint';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl: string;
  private apiEndpoint: BankApiEndpoint;
  private defaultOptions: any;

  constructor(private httpClient: HttpClient) {
    this.defaultOptions = { headers: { 'Content-Type': 'application/json' } };
    this.apiEndpoint = environment.apiEndpoints;
  }

  //Add a Customer (5.1.2)
  addCustomer(postCustomer) {
    return this.httpClient.post(
      this.apiEndpoint.Customers,
      postCustomer,
      this.defaultOptions
    );
  }

  //Edit one customer (5.1.3)
  editCustomer(putCustomer) {
    return this.httpClient.put(
      `${this.apiEndpoint.Customers}${putCustomer.Cust_Id}`,
      putCustomer,
      this.defaultOptions
    );
  }

 // Get all Customers (5.1.7)
  getCustomers() {
    return this.httpClient.get<Customer[]>(this.apiEndpoint.Customers);
  }

 // Get one Customeer () 
  getCustomer(Cust_Id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.apiEndpoint.Customers}${Cust_Id}`);
  }

 // Delete one customer (5.1.4)
  deleteCustomer(Cust_Id: number) {
    return this.httpClient.delete(`${this.apiEndpoint.Customers}${Cust_Id}`);
  }
}
