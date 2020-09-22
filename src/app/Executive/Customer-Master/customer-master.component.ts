import { Component } from '@angular/core';
import { CustomerService } from 'src/service/customer.service'
import {Customer} from 'src/model/Customer'

@Component({
  selector: 'app-root',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent 
{

  public customerList:Customer[]

  constructor(private customerService:CustomerService) 
  {
    customerService.getCustomers().subscribe((result) => {this.customerList = result}, (error) => {alert("Error in fetching customers.\nInfo: " + error)})
  }


}
