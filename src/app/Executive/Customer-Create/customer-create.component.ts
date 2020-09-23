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
  constructor(private customerService:CustomerService, private router:Router) {}

  ngOnInit(){
    this.form = new FormGroup({
        ssn: new FormControl("",  [Validators.required]),
        name: new FormControl("", [Validators.required]),
        age: new FormControl("", [Validators.required]),
        address1: new FormControl("", [Validators.required]),
        address2: new FormControl(""),
        city: new FormControl("", [Validators.required]),
        state: new FormControl("", [Validators.required])
    });
  }

  public customer:Customer

  public postCustomer() 
  {
    this.operationInProgress(true)

    this.customer = new Customer()
    this.customer.SSN = this.form.get('ssn').value
    this.customer.Name = this.form.get('name').value
    this.customer.Age = this.form.get('age').value
    this.customer.Address = `Address Line One: ${this.form.get('address1').value}\n
    Address Line Two: ${this.form.get('address2').value}\n
    City: ${this.form.get('city').value}\n
    State: ${this.form.get('state').value}`

    console.log(this.customer)
    this.customerService.addCustomer(this.customer).subscribe(() =>{this.operationInProgress(false);  this.operationComplete(true, null); this.router.navigateByUrl('/')}, (error) => { this.operationInProgress(false); this.operationComplete(false, JSON.stringify(error))})
  }

  private operationInProgress(yesno:Boolean) 
  {

  }

  private operationComplete(success:Boolean, message:string)
  {
    alert("The Operation Was " + (success ? "" : "Not " + "Successful.") + (message == null ? "" : ("\nInfo: " + message))) 
  }
}
