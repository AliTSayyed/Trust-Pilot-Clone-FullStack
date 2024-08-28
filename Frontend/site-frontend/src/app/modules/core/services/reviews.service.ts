import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { FilterParams, PaginationParams, Review, Reviews } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private apiService: ApiService) { }

  // make a new function to call on the api service's get method to get all the reviews. Makes it easier to write. 
  getReviews = (url: string, params:PaginationParams): Observable<Reviews> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }

  // This will get all the reviews as an array of review items. Not a Reviews object that returns pagination related data. 
  getReviewsNoParam = (url: string): Observable<Review[]> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  }

  // This is a post request that sends a body of type Review
  postReview = (url:string, body:Review): Observable<any> => {
    return this.apiService.post(url, body, {});
  }

  // This is a get request that gets the filtered reviews with the correct pagination. Must reutrn a Reviews object for pagination data. 
  getSortedReviews  = (url:string, params:FilterParams): Observable<Reviews> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }
}
