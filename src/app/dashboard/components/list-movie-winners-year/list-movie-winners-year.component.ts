import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from './../../../../core/services/movie.service';
import { Movie } from './../../../../core/models/movie';

@Component({
  selector: 'app-list-movie-winners-year',
  templateUrl: './list-movie-winners-year.component.html',
  styleUrls: ['./list-movie-winners-year.component.scss']
})
export class ListMovieWinnersYearComponent implements OnInit {

  searchMovieForm: FormGroup;

  isLoading: boolean = false;

  winnersMovieList: Movie[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService
  ) {

    this.searchMovieForm = this.formBuilder.group({
      movieYear: [null, [
        Validators.required,
        Validators.maxLength(4),
        Validators.max(2999),
        Validators.min(1900),
      ],]
    });

  }

  ngOnInit(): void {

  }

  searchMovieByYear() {

    this.isLoading = true;

    let movieYear: number = this.searchMovieForm.controls["movieYear"].value;

    this.movieService.listMoviesWinnersByYear(movieYear).subscribe({
      next: (movies: Movie[]) => {
        this.winnersMovieList = movies;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });

  }

}


