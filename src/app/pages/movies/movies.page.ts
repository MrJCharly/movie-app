import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movieService.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  items = [];

  constructor(private service: MovieService) { }

  ngOnInit() { }

  onIonChange(event) {
    this.searchMovies(event.detail.value);
  }

  searchMovies(s) {
    let movie = { s };

    this.service.search(movie).subscribe(response => {
      console.log(response);
      if (response.Response == "False") {
        this.items = [];
        return;
      }

      this.items = response.Search;
    }, error => {
      console.log(error);
    });
  }
}
