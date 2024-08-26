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
  first = 0;
  totalRecords: number = 0;

  // take use to submit-review page to write a review
  submissionPage(){
    this.router.navigate(['/submit-review']);
  }

  browseReviews(){
    window.scrollBy({
      top: 675, // Amount to scroll down in pixels
      left: 0,
      behavior: 'smooth'
    });
  }

  onPageChange(event: any){
    const pageIndex = event.page + 1; // primeng paginator starts at page 0 but django starts at page 1. Need to adjust for 0 based index. 
    this.fetchReviews(pageIndex, event.rows);
    this.first = event.first; // first keeps track of the index in the review list and knows what index item to start displaying on a certain page. 
  }

  fetchReviews(page:number, perPage:number){
    this.reviewService.getReviews('http://127.0.0.1:8000/api/reviews/',{page, perPage} ).subscribe((reviews: Reviews) => {
      this.reviews = reviews.reviews;
      this.totalRecords = reviews.total;
    })
  }

  ngOnInit() {
    this.fetchReviews(1, this.rows); // when the page first loads, send the first 9 reviews from the database. More reviews can be seen with the paginator. 
  }
}
