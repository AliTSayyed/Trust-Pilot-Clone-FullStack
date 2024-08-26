import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Options, User } from '../../../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  // use the get method from the api service to create a method that specifcally gets users. 
  getUsers = (url:string, options?:Options): Observable<User[]> => {
    return this.apiService.get(url, {
      responseType: 'json'
    });
  }

  getOneUser = (url:string, options?:Options): Observable<User> => {
    return this.apiService.get(url);
  }
}
