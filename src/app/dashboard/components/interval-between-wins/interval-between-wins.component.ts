import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interval } from './../../../../core/models/interval';
import { MovieService } from 'src/core/services/movie.service';

@Component({
  selector: 'app-interval-between-wins',
  templateUrl: './interval-between-wins.component.html',
  styleUrls: ['./interval-between-wins.component.scss']
})
export class IntervalBetweenWinsComponent implements OnInit {

  producerWinInterval: Interval = new Interval();

  constructor(
    private http: HttpClient,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.getProducerWinInterval();
  }

  getProducerWinInterval() {

    this.movieService.producersWinInterval().subscribe({
      next: (interval) => {
        this.producerWinInterval = interval;
      },
      error: (err) => {
        console.log();
      }
    });

  }

}
