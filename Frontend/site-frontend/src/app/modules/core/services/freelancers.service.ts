import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Freelancer, Options, Review, Reviews } from '../../../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreelancersService {

  constructor(private apiService: ApiService) { }
  
  // make a new function to call on the api service's get method to retrive all freelancer names. Makes it easier to write. 
  getFreelancers = (url: string, options?:Options): Observable<Freelancer[]> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  }
  // Same get request but it is returning an observable of type Freelancer not an array. Gets only 1 freelancer. 
  getOneFreelancer = (url: string, options?:Options): Observable<Freelancer> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  }

}
