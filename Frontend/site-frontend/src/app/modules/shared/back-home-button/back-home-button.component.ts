import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-back-home-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './back-home-button.component.html',
  styleUrl: './back-home-button.component.scss'
})
export class BackHomeButtonComponent {

  constructor(private router: Router){}
  
  // take use to submit-review page to write a review
  homePage() {
    this.router.navigate(['']);
  }

}
