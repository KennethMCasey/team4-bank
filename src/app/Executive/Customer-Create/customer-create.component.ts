import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/model/Customer';
import {CustomerService} from 'src/service/customer.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit
{
  form: FormGroup;
  constructor(private customerService:CustomerService, private router:Router) 
  {  
  }
  ngOnInit(){
    this.form = new FormGroup({
        ssn: new FormControl("Requires SSN",  [Validators.required]),
        name: new FormControl("name", [Validators.required]),
        age: new FormControl("fsd", [Validators.required]),
        address1: new FormControl("sdfg", [Validators.required]),
        city: new FormControl("sfdg", [Validators.required]),
        state: new FormControl("", [Validators.required])
    });
    // onSubmit(this.customer)
    // {
    //   this.customerService.addCustomer(this.customer).subscribe(
    //     (response) => console.log('Record Inserted'),
    //     (error) => console.log(error)
    //    )
    //    this.router.navigate(['/']);
    // }
}

  public customer:Customer

  public postCustomer() 
  {
    this.operationInProgress(true)
    this.customerService.addCustomer(this.customer).subscribe(() =>{this.operationInProgress(false);  this.operationComplete(true, null); this.router.navigateByUrl('/')}, (error) => { this.operationInProgress(false); this.operationComplete(false, error)})
  }

  private operationInProgress(yesno:Boolean) 
  {

  }

  private operationComplete(success:Boolean, message:string)
  {
    alert("The Operation Was " + success ? "" : "Not " + "Successful." + message == null ? "" : ("\nInfo: " + message)) 
  }
}
