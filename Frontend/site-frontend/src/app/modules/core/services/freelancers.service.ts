import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Freelancer, Options, Reviews } from '../../../../types';
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
}
