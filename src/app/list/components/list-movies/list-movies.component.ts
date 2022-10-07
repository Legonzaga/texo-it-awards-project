import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Movie } from 'src/core/models/movie';
import { Pageable } from 'src/core/models/search';
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

  paginator: Pageable = new Pageable();

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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {

    this.paginator.pageNumber = this.route.snapshot.params['pageNumber'];

    console.log('Page number ', this.paginator.pageNumber);

    this.paginationItems.link = [''];

    this.paginationItems.pageNumber = 0;

    console.log(this.filter.value);


  }

  ngOnInit(): void {

    this.paginator.pageNumber = 0;

    this.paginator.pageSize = 15;

    this.urlSuffix = this.urlBuilder(this.paginator, null, null);

    this.listMovies(this.paginator, this.urlSuffix);

    this.filterByWinner.setValue('default');

  }


  listMovies(search: Pageable | null, url: string | '') {

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
      },
      complete: () => {
        this.isLoading = false;
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
  urlBuilder(pageable: Pageable | null, winner: boolean | null, year: number | null): string {

    let pagination = new Pageable();

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

    if (this.paginator.pageNumber < this.paginationItems.pageNumber) {

      this.paginator.pageNumber++;

      this.urlSuffix = this.urlBuilder(this.paginator, null, null);

      this.listMovies(this.paginator, this.urlSuffix)

    }
  }

  prevPage() {

    if (this.paginator.pageNumber > 0) {

      this.paginator.pageNumber--;

      this.urlSuffix = this.urlBuilder(this.paginator, null, null);

      this.listMovies(this.paginator, this.urlSuffix)

    }

  }

  selectPage(page: number | null) {

    this.paginator.pageNumber = page || 0;

    this.urlSuffix = this.urlBuilder(this.paginator, null, null);

    this.listMovies(this.paginator, this.urlSuffix)
  }

  filtering() {

    this.filterResult = [];

    for (let m of this.movies) {

      if (this.filter.value === m.year.toString()) {
        this.filterResult.push(m);
      }
    }

  }

  filteringByWinner() {

    this.filterResult = [];

    for (let m of this.movies) {

      if (this.filterByWinner.value === m.winner.toString()) {
        this.filterResult.push(m);
      }
    }

  }




}
