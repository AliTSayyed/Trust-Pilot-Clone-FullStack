import { Component } from '@angular/core';
import { ReviewsService } from '../../core/services/reviews.service';
import { Review, Reviews } from '../../../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent {

  constructor(private reviewService: ReviewsService, private router: Router){}

  reviews: Review[] = [];
  
  rows:number = 9;
  totalRecords: number = 0;

  // take use to submit-review page to write a review
  submissionPage(){
    this.router.navigate(['/submit-review']);
  }

  onPageChange(event: any){
    this.fetchReviews(event.page, event.rows); // this will update what reviews are shown when the paginator is interacted with
  }

  fetchReviews(page:number, perPage:number){
    this.reviewService.getReviews('http://127.0.0.1:8000/api/reviews/',{page, perPage} ).subscribe((reviews: Reviews) => {
      console.log(reviews.reviews);
      this.reviews = reviews.reviews;
      this.totalRecords = reviews.total;
    })
  }

  ngOnInit() {
    this.fetchReviews(1, this.rows); // when the page first loads, send the first 9 reviews from the database. More reviews can be seen with the paginator. 
  }
}
