import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options { // this is the interface for the options a get request can have 
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  };
  observe?: 'body';
  context?: HttpContext;
  params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
      includeHeaders?: string[];
  } | boolean;
}

export interface Reviews{
  reviews: Review[],
  total: number,
  page: number,
  perPage: number,
  totalPages: number,
}

export interface Review{
  id?:number,
  user: string,
  rating: number,
  review_text: string,
  date: string,
  freelancer: string
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