import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { Movie } from './../models/movie';

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


}
