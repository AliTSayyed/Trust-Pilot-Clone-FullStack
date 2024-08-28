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
    totalPages: 0
  };

  ratingSortOptions = [
    { label: 'High to Low', value: 'rating_high_to_low' },
    { label: 'Low to High', value: 'rating_low_to_high' },
  ];

  dateSortOptions = [
    { label: 'Newest First', value: 'date_newest_first' },
    { label: 'Oldest First', value: 'date_oldest_first' },
  ];

  freelancerSortOptions: [{ label: string; value: number }] = [
    { label: '', value: 0 },
  ];

  selectedRatingSort: string = '';
  selectedDateSort: string = '';
  freelancerSearch: number = 0;

  freelancers: Freelancer[] = [];

  params: FilterParams = {
    sort_by: [],
    freelancer: [],
    page: 0,
    perPage: 0
  };

  ngOnInit() {
    this.fetchFreelancers();
  }

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

  applyFilters() {
    if (this.selectedRatingSort === '' && this.selectedDateSort === '' && this.freelancerSearch === 0){
      this.clearFilters();
    }
    if (this.freelancerSearch === 0) {
      this.params = {
        sort_by: [this.selectedRatingSort, this.selectedDateSort],
        freelancer: [],
        page: 1,
        perPage: 9
      };
    } else {
      this.params = {
        sort_by: [this.selectedRatingSort, this.selectedDateSort],
        freelancer: [this.freelancerSearch],
        page: 1,
        perPage: 9
      };
    }
    this.fetchFilteredReviews();
  }

  fetchFilteredReviews(){
    this.reviewService
      .getSortedReviews(
        'http://127.0.0.1:8000/api/sort_and_filter_reviews/',
        this.params, 
      )
      .subscribe((reviews: Reviews) => {
        this.reviews.reviews = reviews.reviews;
        this.reviews.page = reviews.page;
        this.reviews.perPage = reviews.perPage;
        this.reviews.total = reviews.total;
        this.reviews.totalPages = reviews.totalPages;
        this.reviewsFiltered.emit(this.reviews);
      });
  }

  resetReviews(){
    this.reviewService.getReviewsNoPagination('http://127.0.0.1:8000/api/reviews/').subscribe((reviews: Reviews) => {
      this.reviews.reviews = reviews.reviews;
      this.reviews.page = reviews.page;
      this.reviews.perPage = reviews.perPage;
      this.reviews.total = reviews.total;
      this.reviews.totalPages = reviews.totalPages;
      this.reviewsFiltered.emit(this.reviews);
    });
  }

  clearFilters() {
    this.selectedRatingSort = '';
    this.selectedDateSort = '';
    this.freelancerSearch = 0;
    this.resetReviews();
  }
}
