import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Movie } from 'src/core/models/movie';
import { Paginator } from 'src/core/models/search';
import { MovieService } from 'src/core/services/movie.service';

export interface PaginableItens {
  link: string[];
  pageNumber: number;
}

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {

  isLoading: boolean = false;

  paginator: Paginator = new Paginator();

  previusPage!: number;

  totalPages: number[] = [];

  totalElements: number = 0;

  movies: Movie[] = [];

  urlSuffix: string = '';

  paginationItems: PaginableItens = {
    link: [],
    pageNumber: 0
  }

  searchTerm: string = '';

  filter: FormControl = new FormControl('');

  filterByWinner: FormControl = new FormControl('');

  filterResult: Movie[] = [];

  showYearErroType: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.paginator.pageNumber = this.route.snapshot.params['pageNumber'];

    this.paginationItems.link = [''];

    this.paginationItems.pageNumber = 0;
  }

  ngOnInit(): void {

    this.paginator.pageNumber = 0;

    this.paginator.pageSize = 15;

    this.urlSuffix = this.urlBuilder(this.paginator, null, null);

    this.listMovies(this.paginator, this.urlSuffix);

    this.filterByWinner.setValue('default');

  }


  listMovies(search: Paginator | null, url: string | '') {

    this.isLoading = true;

    this.movies = [];

    this.movieService.listMovies(url).subscribe({
      next: (result) => {

        this.movies = result.content

        this.settingPagination(result.totalPages);

        this.totalElements = result.totalElements;

      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.filter.enable();
        this.filterByWinner.enable();
      },
      complete: () => {
        this.isLoading = false;
        this.filter.enable();
        this.filterByWinner.enable();
      }
    });

  }

  /**
   * * Constructs an url to search movies
   * @param pageable : Pageale => Pagination settings
   * @param winner: boolean => yes:true / no:false
   * @param year : number => movie year
   * @returns : string => An URL to listMovies method
   */
  urlBuilder(pageable: Paginator | null, winner: boolean | null, year: number | null): string {

    let pagination = new Paginator();

    pagination.pageNumber = 0;

    pagination.pageSize = 15;

    pagination = pageable || pagination;

    let url: string = '?';

    if (pagination?.pageNumber >= 0) {
      url += `page=${pagination?.pageNumber}`;
    }

    if (pagination?.pageSize) {
      url += `&size=${pagination?.pageSize}`;
    }

    if (winner) {
      url += `&winner=${winner}`;
    }

    if (year) {
      url += `&year=${year}`;
    }

    return url;
  }



  settingPagination(totalPages: number) {

    this.paginationItems.link = [];

    this.paginationItems.pageNumber = 0;

    for (let i = 0; i < totalPages; i++) {
      this.paginationItems.link.push(`/list/${i.toString()}`);
    }

    this.paginationItems.pageNumber = totalPages;

  }


  nextPage() {

    let winner = this.filterByWinner.value;

    let movieYear = this.filter.value;

    if (this.paginator.pageNumber < this.paginationItems.pageNumber) {

      this.paginator.pageNumber++;

      if (winner !== 'default' && movieYear <= 1000) {
        this.urlSuffix = this.urlBuilder(this.paginator, winner, null);
      }
      else if (winner !== 'default' && movieYear >= 1000) {
        this.urlSuffix = this.urlBuilder(this.paginator, winner, movieYear);
      }
      else {
        this.urlSuffix = this.urlBuilder(this.paginator, null, null);
      }

      this.listMovies(this.paginator, this.urlSuffix)

    }

    this.router.navigate(['/list', this.paginator.pageNumber ]);
  }

  prevPage() {

    let winner = this.filterByWinner.value;

    let movieYear = this.filter.value;

    if (this.paginator.pageNumber > 0) {

      this.paginator.pageNumber--;

      if (winner !== 'default' && movieYear <= 1000) {
        this.urlSuffix = this.urlBuilder(this.paginator, winner, null);
      }
      else if (winner !== 'default' && movieYear >= 1000) {
        this.urlSuffix = this.urlBuilder(this.paginator, winner, movieYear);
      } else {
        this.urlSuffix = this.urlBuilder(this.paginator, null, null);
      }


      this.listMovies(this.paginator, this.urlSuffix)

    }

  }

  selectPage(page: number | null) {

    let winner = this.filterByWinner.value;

    let movieYear = this.filter.value;

    this.paginator.pageNumber = page || 0;

    if (winner !== 'default' && movieYear <= 1000) {
      this.urlSuffix = this.urlBuilder(this.paginator, winner, null);
    }
    else if (winner !== 'default' && movieYear >= 1000) {
      this.urlSuffix = this.urlBuilder(this.paginator, winner, movieYear);
    } else {
      this.urlSuffix = this.urlBuilder(this.paginator, null, null);
    }

    this.listMovies(this.paginator, this.urlSuffix)
  }

  filtering() {

    let winner = this.filterByWinner.value;

    let movieYear = parseInt(this.filter.value);

    console.log(movieYear);


    console.log("movieYear ", movieYear);


    if (typeof (movieYear) !== 'number' && movieYear > 0) {

      this.filter.setValue('');

      this.hideYearTypeError();

    }

    this.filterResult = [];

    this.paginator.pageNumber = 0;

    if (movieYear >= 1000 && winner !== 'default') {

      this.filter.disable();

      this.filterByWinner.disable();

      this.urlSuffix = this.urlBuilder(this.paginator, winner, movieYear);

      this.listMovies(this.paginator, this.urlSuffix);

    }
    else if (movieYear >= 1000 && winner === 'default') {

      this.filter.disable();

      this.filterByWinner.disable();

      this.urlSuffix = this.urlBuilder(this.paginator, null, movieYear);

      this.listMovies(this.paginator, this.urlSuffix);

    }
    else if (isNaN(movieYear) && winner === 'default') {

      this.filter.disable();

      this.filterByWinner.disable();

      this.urlSuffix = this.urlBuilder(this.paginator, null, null);

      this.listMovies(this.paginator, this.urlSuffix);

    }
    else {

      this.filter.enable();

      this.filterByWinner.enable();

    }

  }

  hideYearTypeError() {

    this.showYearErroType = true;

    setTimeout(() => {
      this.showYearErroType = false;
    }, 3000);
  }

  filteringByWinner() {

    let winner = this.filterByWinner.value;

    let movieYear = this.filter.value;

    this.filterResult = [];

    this.paginator.pageNumber = 0;

    if (winner !== 'default' && movieYear >= 1000) {

      this.urlSuffix = this.urlBuilder(this.paginator, winner, movieYear);

      this.listMovies(this.paginator, this.urlSuffix);

    }
    else if (winner !== 'default' && movieYear <= 1000) {

      this.urlSuffix = this.urlBuilder(this.paginator, winner, null);

      this.listMovies(this.paginator, this.urlSuffix);

    }
    else if (winner === 'default' && movieYear >= 1000) {

      this.urlSuffix = this.urlBuilder(this.paginator, null, movieYear);

      this.listMovies(this.paginator, this.urlSuffix);

    }
    else if (winner === 'default' && movieYear <= 1000) {

      this.urlSuffix = this.urlBuilder(this.paginator, null, null);

      this.listMovies(this.paginator, this.urlSuffix);

    }
    else {

      this.urlSuffix = this.urlBuilder(this.paginator, winner, null);

      this.listMovies(this.paginator, this.urlSuffix);

    }

  }

}
