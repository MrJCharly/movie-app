import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movieService.service';
import { LoadingController } from '@ionic/angular';

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

  constructor(
    private service: MovieService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() { }

  onIonChange(event) {
    this.loadFirstPage();
  }

  onIonInfinite(event) {
    this.doOnIonInfinite(event);
  }

  loadFirstPage() {
    this.service.loadNextPage(0, this.term, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }

      this.items = response.Search;
      this.totalPages = Math.ceil(response.totalResults / this.itemsPerPage);

      if (this.totalPages == 1) {
        this.page = 1;
        return;
      }

      // Load next page so the list reaches screen's bottom.
      this.service.loadNextPage(1, this.term, (error, response) => {
        if (error) {
          console.log(error);
          return;
        }

        this.items = [...this.items, ...response.Search];
        this.page = 2;
      });
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

  async createLoading() {
    const loading = await this.loadingCtrl.create({
      showBackdrop: false,
      translucent: true,
      spinner: null,
      duration: 500
    });

    return await loading.present();
  }

  async closeLoading() {
    const loading = await this.loadingCtrl.getTop();

    if (!loading) {
      return;
    }

    return await loading.dismiss();
  }
}
