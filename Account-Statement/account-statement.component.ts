import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})

export class AccountStatementComponent 
{
  private selectedLink: string="By Transactions";        
  
    setradio(e: string): void   
  {  
  
        this.selectedLink = e;  
          
  }  
  
    isSelected(name: string): boolean   
  {  
  
        if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
            return false;  
  }  
  
        return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
    }   
 //Place Holder
}
