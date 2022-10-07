import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieService } from 'src/core/services/movie.service';
import { Studio, StudioList } from 'src/core/models/studios';

@Component({
  selector: 'app-top-studio-winners',
  templateUrl: './top-studio-winners.component.html',
  styleUrls: ['./top-studio-winners.component.scss']
})
export class TopStudioWinnersComponent implements OnInit {

  studioList!: StudioList;

  topWinners!: Studio[];

  constructor(
    private http: HttpClient,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.getTopStudios();
  }

  getTopStudios() {

    this.movieService.listWinnersStudios().subscribe({
      next: (list) => {
        this.studioList = list;

        this.gatherTopWinners(this.studioList);

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  gatherTopWinners(list: StudioList) {
    this.topWinners = list.studios.slice(0, 3);
  }

}
