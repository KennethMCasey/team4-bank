import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private quizService: QuizService, private router:Router ) { } //Service to be changed

  ngOnInit(): void {
  }

  SignOut()
  {
    localStorage.clear();
    clearInterval(this.quizService.timer); //timer property to be set
    this.router.navigate(['/register']); //Navigation link to be changed
  }

}
