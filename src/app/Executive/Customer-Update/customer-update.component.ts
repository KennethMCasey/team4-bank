import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/service/customer.service'
import { Customer } from 'src/model/Customer'
import {Router, ActivatedRoute} from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit
{
  public form:FormGroup
  public customer: Customer

  constructor(private customerService:CustomerService, private router:Router, private route:ActivatedRoute) {}

  ngOnInit() {

    this.form = new FormGroup({
      ssn: new FormControl( "",  [Validators.required]),
      name: new FormControl( "", [Validators.required]),
      age: new FormControl( "", [Validators.required, Validators.maxLength(3)]),
      address: new FormControl( "", [Validators.required])
  });
  this.form.disable()

    this.customerService.getCustomer(Number.parseInt(this.route.snapshot.paramMap.get('id'))).subscribe
    (
      (result) => 
      {
        this.customer = result
        this.form.get('ssn').setValue( this.customer.SSN )
        this.form.get('name').setValue(this.customer.Name)
        this.form.get('age').setValue(this.customer.Age)
        this.form.get('address').setValue(this.customer.Address)
        this.form.enable()
      },
      (error) => {alert('Error finding customer: ' + JSON.stringify(error));  this.form.enable()}//delete enable line after hooked up to data
      
    )

    
    
  }
  public postCustomer() 
  {
    this.operationInProgress(true)

    this.customer = this.customer == null ? new Customer() : this.customer
    this.customer.SSN = this.form.get('ssn').value
    this.customer.Name = this.form.get('name').value
    this.customer.Age = this.form.get('age').value
    this.customer.Address = this.form.get('address').value
    console.log(this.customer)

    this.customerService.editCustomer(Customer).subscribe((response) =>{this.operationInProgress(false);  this.operationComplete(true, null); () => this.router.navigateByUrl('/')}, (error) => { this.operationInProgress(false); this.operationComplete(false, JSON.stringify(error))})
  }

  private operationInProgress(yesno:Boolean) 
  {

  }

  private operationComplete(success:Boolean, message:string)
  {
    alert("The Operation Was " + (success ? "" : "Not " + "Successful.") + (message == null ? "" : ("\nInfo: " + message))) 
  }

}
