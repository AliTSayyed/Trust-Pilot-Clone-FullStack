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
  filteredReviews: Review[] = [];
  isFiltered: boolean = false;

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
    if (this.isFiltered){
      this.paginateFilteredReviews(pageIndex, event.rows);
    } else {
      this.fetchReviews(pageIndex, event.rows)
    }
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

  onReviewsFiltered(filteredReviews: Reviews){
    this.isFiltered = true;
    this.filteredReviews = filteredReviews.reviews;
    this.paginateFilteredReviews(1, this.rows);
  }

  paginateFilteredReviews(page: number, perPage: number){
    const start = (page-1) * perPage;
    const end = start + perPage;
    this.reviews = this.filteredReviews.slice(start,end);
    this.totalRecords = this.filteredReviews.length;
  }

}
