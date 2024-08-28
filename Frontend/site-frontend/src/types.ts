import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

// this file is used to declare the types of different objects created in this project. Ensures type safety. 

export interface Options {
  // this is the interface for the options a get request can have
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Reviews {
  reviews: Review[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Review {
  // get requests need to recieve a number, post requests need to send a string for users/user_name and freelancer/freelancer_name
  id?: number;
  user?: number;
  user_name?: string;
  rating: number;
  review_text: string;
  date: string;
  freelancer?: number;
  freelancer_name?: string;
}

export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}

export interface FilterParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  sort_by: string[];
  freelancer: number[];
  page: number;
  perPage: number;
}

export interface Freelancer {
  id: number;
  freelancer_name: string;
}

export interface User {
  id: number;
  user_name: string;
}
