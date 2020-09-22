import { Component } from '@angular/core';
import { Customer } from 'src/model/Customer';
import {CustomerService} from 'src/service/customer.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent 
{
  constructor(private customerService:CustomerService, private router:Router) 
  {
    
  }

  public customer:Customer

  public postCustomer() 
  {
    this.operationInProgress(true)
    this.customerService.addCustomer(this.customer).subscribe((response) =>{this.operationInProgress(false);  this.operationComplete(true, null); this.router.navigateByUrl('/')}, (error) => { this.operationInProgress(false); this.operationComplete(false, error)})
  }

  private operationInProgress(yesno:Boolean) 
  {

  }

  private operationComplete(success:Boolean, message:string)
  {
    alert("The Operation Was " + success ? "" : "Not " + "Successful." + message == null ? "" : ("\nInfo: " + message)) 
  }
}
