import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-movie-winners-year',
  templateUrl: './list-movie-winners-year.component.html',
  styleUrls: ['./list-movie-winners-year.component.scss']
})
export class ListMovieWinnersYearComponent implements OnInit {

  searchMovieForm: FormGroup;

  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder
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

    let movieYear: number = this.searchMovieForm.controls["movieYear"].value;

    console.log(movieYear);

  }

}


