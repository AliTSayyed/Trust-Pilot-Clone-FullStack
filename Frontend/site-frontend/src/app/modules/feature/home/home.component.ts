import { Component } from '@angular/core';
import { ReviewsService } from '../../core/services/reviews.service';
import { Reviews } from '../../../../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent {

  constructor(private reviewService: ReviewsService){}

  ngOnInit() {
    this.reviewService.getReviews('http://127.0.0.1:8000/api/reviews/',{page: 1, perPage:5} ).subscribe((reviews: Reviews) => {
      console.log(reviews);
    })
  }
}
