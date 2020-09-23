import { Component } from '@angular/core';
import { CustomerService } from 'src/service/customer.service'
import {Customer} from 'src/model/Customer'
import {TransactionService} from 'src/service/transaction.service'
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-root',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent 
{

  public customerList:Customer[]

  constructor(private customerService:CustomerService, private transactionService:TransactionService) 
  {
    customerService.getCustomers().subscribe(
      (result) => {console.log("result: " + result); this.customerList = result},
      (error) => {console.log("error: " + error); alert("Error in fetching customers.\nInfo: " + error)})
  }

  getLastUpdated(id:number) 
  {
    this.transactionService.getTransactions(id,0,0) .subscribe
    (
      (result) => {console.log("result:" + result); return result[0].Tran_Date},
      (error) => {console.log("error: " + error)}

    )
  }

}
