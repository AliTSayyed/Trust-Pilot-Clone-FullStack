import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Review } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient // client used to make rest api calls 
) {}

  get<T>(url:string, options?:Options ): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T>(url:string, body:Review, options:Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }
}
