import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Review, Reviews } from '../../../../types';

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

  getReviewsNoParam= (url: string): Observable<Review[]> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  }

  postReview = (url:string, body:Review): Observable<any> => {
    return this.apiService.post(url, body, {});
  }
}
