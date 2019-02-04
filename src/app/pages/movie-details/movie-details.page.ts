import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movieService.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  details = {};

  constructor (
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService) { }

  ngOnInit() {
    this.loadMovieDetails();
  }

  loadMovieDetails() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");

    this.movieService.getDetails(id).subscribe(result => {
      console.log(result);
      this.details = result;
    }, error => {
      console.log(error);
    });
  }

  openWebsite() {
    window.open(this.details.Website, '_blank');
  }
}
