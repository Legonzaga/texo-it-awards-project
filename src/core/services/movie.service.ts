import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Movie } from './../models/movie';
import { Pageable, SearchMovie } from './../models/search';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * * Lists movies winners by year
   * @param year : number
   * @returns : Movie[]
   */
  listMoviesWinnersByYear(year: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(environment.apiUrl + `?winner=true&year=${year}`);
  }


  /**
   * * List movies given the parameters below:
   * @param search : Pageable => Pagination attributes are setted here
   * @param winner : boolean => yes : true / no : false
   * @param year : number => Movie year
   * @returns : Observable<SearchMovie>
   */
  listMovies(url: string): Observable<SearchMovie> {
    return this.http.get<SearchMovie>(environment.apiUrl + url);
  }

}
