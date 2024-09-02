import { Component, EventEmitter, Output } from '@angular/core';
import { ReviewsService } from '../../core/services/reviews.service';
import { FilterParams, Freelancer, Review, Reviews } from '../../../../types';
import { FreelancersService } from '../../core/services/freelancers.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  // when a filter is applied, need to output that Reviews object to the home component so it can update its reviews object to then display the correct selection of reviews.
  @Output() reviewsFiltered = new EventEmitter<Reviews>();

  constructor(
    private reviewService: ReviewsService,
    private freelancerService: FreelancersService
  ) {}

  // All the reviews (sorted/filtered and all will be stored here)
  reviews: Reviews = {
    reviews: [],
    total: 0,
    page: 0,
    perPage: 0,
    totalPages: 0,
  };

  // These are the options for sorting ratings, the value is what is used in the backend.
  ratingSortOptions = [
    { label: 'High to Low', value: 'rating_high_to_low' },
    { label: 'Low to High', value: 'rating_low_to_high' },
  ];

  // These are the options for sorting dates, the value is what is used in the backend.
  dateSortOptions = [
    { label: 'Newest First', value: 'date_newest_first' },
    { label: 'Oldest First', value: 'date_oldest_first' },
  ];

  // These are the options for sorting freelancers, the value is what is used in the backend. The list will be filled on initilization
  freelancerSortOptions: [{ label: string; value: number }] = [
    { label: '', value: 0 },
  ];

  // these variables store the values from the options, part of the ngmodel on the p-toolbar's p-dropdown component.
  selectedRatingSort: string = '';
  selectedDateSort: string = '';
  freelancerSearch: number = 0;

  // stores the freelancer's id. It can be passed as empty if no freelancer is selected to be filtered.
  freelancers: Freelancer[] = [];

  // on initilization on the home component, the filter will also fetch all the freelancers. Without this, no freelancer filtering can be done.
  ngOnInit() {
    this.fetchFreelancers();
  }

  // get all the freelancers and then update the freelancerSortOptions to contain all the freelancers as options to sort reviews by.
  fetchFreelancers() {
    this.freelancerService
      .getFreelancers('http://127.0.0.1:8000/api/freelancers')
      .subscribe((freelancers: Freelancer[]) => {
        this.freelancers = freelancers;
        this.freelancers.forEach((freelancer) => {
          this.freelancerSortOptions.push({
            label: freelancer.freelancer_name,
            value: freelancer.id,
          });
        });
      });
  }

  // when the apply filters button is pressed, filter the reviews and send fetch the correct data.
  applyFilters() {
    // if no filters are selected and apply filters is pressed, clear the filters and reset the data.
    if (
      this.selectedRatingSort === '' &&
      this.selectedDateSort === '' &&
      this.freelancerSearch === 0
    ) {
      this.clearFilters();
    } else if (this.freelancerSearch === 0) {
      // if no freelancer is selected (id = 0) then pass an empty array for the freelancer. This makes it possible to send no freelancer and avoids a null error
      const params = {
        sort_by: [this.selectedRatingSort, this.selectedDateSort],
        freelancer: [],
        page: 1,
        perPage: 9,
      };
      // get the filtered reviews from the backend
      this.fetchFilteredReviews(params);
    } else {
      const params = {
        sort_by: [this.selectedRatingSort, this.selectedDateSort],
        freelancer: [this.freelancerSearch],
        page: 1,
        perPage: 9,
      };
      // get the filtered reviews from the backend
      this.fetchFilteredReviews(params);
    }
  }

  // method to get the filtered review sfrom the backend after sending the correct params of type FilterParams (includes pagination and can be found in the types.ts file)
  fetchFilteredReviews(params: FilterParams) {
    this.reviewService
      .getSortedReviews(
        'http://127.0.0.1:8000/api/sort_and_filter_reviews/',
        params
      )
      .subscribe((reviews: Reviews) => {
        this.reviews.reviews = reviews.reviews;
        this.reviews.page = reviews.page;
        this.reviews.perPage = reviews.perPage;
        this.reviews.total = reviews.total;
        this.reviews.totalPages = reviews.totalPages;
        this.reviewsFiltered.emit(this.reviews); // send the filtered reviews object to the home component. 
      });
  }

  // when the filters want to be reset, then create a reviews object with a per page value of 10. When the home component's onReviewsFiltered() function sees perPage === 10, it will reset the page to its ngOnInit. 
  resetReviews() {
    this.reviewService
      .getReviews('http://127.0.0.1:8000/api/reviews/', {
        page: 1,
        perPage: 10,
      })
      .subscribe((reviews: Reviews) => {
        this.reviews.reviews = reviews.reviews;
        this.reviews.page = reviews.page;
        this.reviews.perPage = 10; // instead of reviews.perPage, hard code 10 so it does not turn in to a string. Used in the homecomponet to check if clearFilters() was pressed.
        this.reviews.total = reviews.total;
        this.reviews.totalPages = reviews.totalPages;
        this.reviewsFiltered.emit(this.reviews);
      });
  }

  // clear the filters labels, values, and reset the reviews shown on the home page. 
  clearFilters() {
    this.selectedRatingSort = '';
    this.selectedDateSort = '';
    this.freelancerSearch = 0;
    this.resetReviews();
  }
}
