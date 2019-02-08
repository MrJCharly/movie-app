import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movieService.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  totalPages = 0;
  itemsPerPage = 10;
  term = "";
  page = 0;
  items = [];

  constructor(private service: MovieService) { }

  ngOnInit() { }

  onIonChange(event) {
    this.searchMovies();
  }

  onIonInfinite(event) {
    this.doOnIonInfinite(event);
  }

  searchMovies() {
    this.service.loadNextPage(0, this.term, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }

      this.items = response.Search;
      this.totalPages = Math.ceil(response.totalResults / this.itemsPerPage);
      this.page = 1;
    });
  }

  doOnIonInfinite(event) {
    this.service.loadNextPage(this.page, this.term, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }

      this.items = [...this.items, ...response.Search];
      event.target.complete();
      this.page++;
    })
  }

}
