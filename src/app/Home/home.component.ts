
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/auth.service';
import { Role } from 'src/model/Role';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isExecutive: boolean;
  isTeller: boolean;

  constructor(private authService : AuthenticationService) { }

  ngOnInit(): void 
  {
    this.isExecutive = this.authService.currentUserValue == null || this.authService.currentUserValue.Role == null ? false : this.authService.currentUserValue.Role  == Role.Executive
    this.isTeller = this.authService.currentUserValue == null || this.authService.currentUserValue.Role == null ? false : this.authService.currentUserValue.Role  == Role.Teller
  }

}