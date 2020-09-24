import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/service/customer.service';
import { Customer } from 'src/model/Customer';
import { TransactionService } from 'src/service/transaction.service';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css'],
})
export class CustomerMasterComponent implements OnInit
{
  public customerList: Customer[];

  constructor(
    private customerService: CustomerService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      (result) => {
        console.log('result: ' + JSON.stringify(result) );

        this.customerList = result;
      },
      (error) => {
        console.log('error: ' + error);
        alert('Error in fetching customers.\nInfo: ' + error);
      }
    );
  }

  getLastUpdated(cid: number) {
    this.customerService.getCustomerUpdate(cid).subscribe(
      (lastDate) => {
        if (lastDate !== null)
        {
          console.log('result:' + lastDate);
          return lastDate
        }
        else {
          return "No activity";
        }
    },
        
      (error) => {
        console.log('error: ' + error);
      }
    );
  }

  onDelete(custId: number) {

    if (confirm('Are you sure you want to delete this entry?')) {
      this.customerService.deleteCustomer(custId).subscribe(
        (res) => {
          alert('Customer deleted!');
          this.ngOnInit();
        },
        (error)  => {
          console.log( JSON.stringify(error) );
          alert('Error: Not Deleted');
        }
      );

    }

  }
}
