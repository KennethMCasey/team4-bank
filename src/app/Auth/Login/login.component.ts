import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit
{

  form: FormGroup;
  emailPattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private authService: AuthenticationService ) {  }

  ngOnInit(){
    this.form = new FormGroup({
      Email: new FormControl("",  [Validators.required]),
      Password: new FormControl("", [Validators.required])
    });
  }

  onSubmit() 
  {
    console.log('whoooaa' + this.form.get('Email').value);
    console.log(this.form.get('Password').value);
    this.authService.login(this.form.get('Email').value, this.form.get('Password').value)
  }
  
}
