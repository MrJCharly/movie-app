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

  loadNextPage(curr_page, term, callback) {
    let page = curr_page + 1;
    let movie = { s: term, page };

    this.search(movie).subscribe(response => {
      console.log(response);
      if (response.Response == "False") {
        return callback({ type: "Search", message: response.Error }, null);
      }

      callback(null, response);
    }, error => {
      return callback({ type: "Http", message: "An unexpected error ocurred." }, null);
    });
  }

  getDetails(i): Observable<any> {
    return this.search({ i });
  }
}
