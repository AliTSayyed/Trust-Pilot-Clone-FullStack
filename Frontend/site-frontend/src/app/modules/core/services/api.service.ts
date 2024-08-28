import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Review } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient // client used to make rest api calls, need to provide http client in apiconfig.ts
) {}

  // create a get function that takes a url and queury params using the httpClient's get mnethod. Returns an observable of any type. 
  get<T>(url:string, options?:Options ): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  // create a post function that takes a url, a body of data to send, and params and uses the httpClient's post method. 
  post<T>(url:string, body:Review, options:Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }
}
