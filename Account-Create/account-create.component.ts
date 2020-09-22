import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent
 {
  //websiteList: any = ['ItSolutionStuff.com', 'HDTuto.com', 'Nicesnippets.com']
  
  form = new FormGroup({
    Acct_Type: new FormControl('', Validators.required)
  });

 //logic
}
