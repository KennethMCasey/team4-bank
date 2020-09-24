import { Component } from '@angular/core';
import { Role } from 'src/model/Role';
import {AuthenticationService} from 'src/service/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'team4-kmc';
  isAdmin:boolean
  isTeller:boolean
  userEmail: string;
  userRole: Role;
  

  //TODO: nav bar
  constructor(private authService:AuthenticationService) 
  {
      this.isAdmin = authService.currentUserValue == null || authService.currentUserValue.Role == null ? false :authService.currentUserValue.Role  == Role.Executive
      this.isTeller = authService.currentUserValue == null || authService.currentUserValue.Role == null ? false :authService.currentUserValue.Role  == Role.Teller
      if (this.isAdmin || this.isTeller){
        this.userEmail =  authService.currentUserValue.Email;
        this.userRole = authService.currentUserValue.Role;
      }
    }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
