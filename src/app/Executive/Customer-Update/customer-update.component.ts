import { Component } from '@angular/core';
import { CustomerService } from 'src/service/customer.service'
import { Customer } from 'src/model/Customer'
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent 
{
  public customer:Customer

  constructor(private customerService:CustomerService, private router:Router) {}

  public postCustomer() 
  {
    this.customerService.editCustomer(Customer).subscribe((response) =>{this.operationInProgress(false);  this.operationComplete(true, null); () => this.router.navigateByUrl('/')}, (error) => { this.operationInProgress(false); this.operationComplete(false, error)})
  }

  private operationInProgress(yesno:Boolean) 
  {

  }

  private operationComplete(success:Boolean, message:string)
  {
    alert("The Operation Was " + success ? "" : "Not " + "Successful." + message == null ? "" : ("\nInfo: " + message)) 
  }

}
