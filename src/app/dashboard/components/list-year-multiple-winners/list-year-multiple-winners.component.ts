import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieService } from 'src/core/services/movie.service';
import { Year } from 'src/core/models/year-multiple-winner';

@Component({
  selector: 'app-list-year-multiple-winners',
  templateUrl: './list-year-multiple-winners.component.html',
  styleUrls: ['./list-year-multiple-winners.component.scss']
})
export class ListYearMultipleWinnersComponent implements OnInit {

  yearsWithMostWinners: Year[] = [];

  constructor(
    private http: HttpClient,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.getYearsWithMostWinners();
  }

  getYearsWithMostWinners() {

    this.movieService.listYearsWithMostWinners().subscribe({
      next: (list) => {
        this.yearsWithMostWinners = list.years;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
