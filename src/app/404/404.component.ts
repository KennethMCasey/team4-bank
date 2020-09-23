import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <p>Looks like {{router.url}} isn't home right now...</p> 
  `
})

export class FourOhFourComponent 
{
  constructor(public router:Router){}
}