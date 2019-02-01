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

  ngOnInit() {
    let movie = {
      s: 'Terminator',
      y: 1991,
      type: 'movie'
    };

    this.service.search(movie).subscribe(response => {
      console.log(response);
      this.items = response.Search;
    }, error => {
      console.log(error);
    });
  }

}
