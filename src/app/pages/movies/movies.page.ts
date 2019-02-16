import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movieService.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  error = null;
  searching = false;
  totalPages = 0;
  itemsPerPage = 10;
  term = "";
  minTermLength = 3;
  page = 0;
  items = [];

  constructor(
    private service: MovieService) { }

  ngOnInit() { }

  onIonChange(event) {
    if (this.term == "" || this.searchTextClearedByXButton(event)) {
      this.items = [];
      return;
    }

    if (this.term.length < this.minTermLength ) {
      this.onError({
        type: "Input",
        message: `Search term must be at least ${this.minTermLength} characters long.`
      });
      return;
    }
    
    this.loadFirstPage();
  }

  searchTextClearedByXButton(event: any) {
    return event.detail.value == "";
  }

  onIonInfinite(event) {
    this.doOnIonInfinite(event);
  }
  
  loadFirstPage() {
    this.searching = true;
    this.error = null;
    this.service.loadNextPage(0, this.term, (error, response) => {
      if (error) {
        this.onError(error);
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
          this.onError(error);
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
    this.error = null;
    this.service.loadNextPage(this.page, this.term, (error, response) => {
      if (error) {
        this.onError(error);
        return;
      }

      this.searching = false;
      this.items = [...this.items, ...response.Search];
      event.target.complete();
      this.page++;
    })
  }

  onError(error) {
    console.log(error);
    this.searching = false;
    this.items = [];
    this.error = error;
  }
}
