import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import queryString from 'query-string';
import config from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {

  }

  search(movie): Observable<any> {
    let { movies } = config;
    let target = {...movie};
    target.apiKey = movies.api_key;
    let query = queryString.stringify(target);

    let url = `${movies.url}?${query}`;
    return this.http.get(url);
  }

  getDetails(i): Observable<any> {
    return this.search({ i });
  }
}
