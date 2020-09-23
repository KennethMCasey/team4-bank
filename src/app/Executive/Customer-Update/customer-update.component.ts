import { Component } from '@angular/core';
import { CustomerService } from 'src/service/customer.service'
import { Customer } from 'src/model/Customer'
import {Router} from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent 
{
  form:FormGroup
  public customer: Customer

  constructor(private customerService:CustomerService, private router:Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      ssn: new FormControl("", [Validators.required]),
      customerID: new FormControl("", [Validators.required]),
    });
  }
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
