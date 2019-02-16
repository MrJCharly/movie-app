import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movieService.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  searching = false;
  totalPages = 0;
  itemsPerPage = 10;
  term = "";
  page = 0;
  items = [];

  constructor(
    private service: MovieService) { }

  ngOnInit() { }

  onIonChange(event) {
    this.loadFirstPage();
  }

  onIonInfinite(event) {
    this.doOnIonInfinite(event);
  }

  loadFirstPage() {
    this.searching = true;
    this.service.loadNextPage(0, this.term, (error, response) => {
      if (error) {
        this.searching = false;
        console.log(error);
        return;
      }

      this.items = response.Search;
      this.totalPages = Math.ceil(response.totalResults / this.itemsPerPage);

      if (this.totalPages == 1) {
        this.searching = false;
        this.page = 1;
        return;
      }

      // Load next page so the list reaches screen's bottom.
      this.service.loadNextPage(1, this.term, (error, response) => {
        if (error) {
          this.searching = false;
          console.log(error);
          return;
        }

        this.searching = false;
        this.items = [...this.items, ...response.Search];
        this.page = 2;
      });
    });
  }

  doOnIonInfinite(event) {
    this.searching = true;
    this.service.loadNextPage(this.page, this.term, (error, response) => {
      if (error) {
        this.searching = false;
        console.log(error);
        return;
      }

      this.searching = false;
      this.items = [...this.items, ...response.Search];
      event.target.complete();
      this.page++;
    })
  }
}
