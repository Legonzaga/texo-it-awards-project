import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Interval } from '../models/interval';
import { Movie } from '../models/movie';
import { SharedModule } from '../shared/shared.module';

import { MovieService } from './movie.service';


describe('MovieService', () => {

  let service: MovieService;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(MovieService);

    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('Verifying right endpoints', () => {


    it('should list movies winners by year with right endpoint', () => {

      const spy = spyOn(http, 'get').and.callThrough();

      service.listMoviesWinnersByYear(1984);

      expect(spy).toHaveBeenCalledWith(environment.apiUrl + `?winner=true&year=1984`);

    });

    it('should list winning studios with correct endpoint', () => {

      const spy = spyOn(http, 'get').and.callThrough();

      service.listWinnersStudios();

      expect(spy).toHaveBeenCalledWith(environment.apiUrl + `?projection=studios-with-win-count`);

    });

    it('should list the years that saw more than one winner with the endpoint', () => {

      const spy = spyOn(http, 'get').and.callThrough();

      service.listYearsWithMostWinners();

      expect(spy).toHaveBeenCalledWith(environment.apiUrl + `?projection=years-with-multiple-winners`);

    });


    it('should list the producers with the largest and smallest interval between victories with the right endpoint', () => {

      const spy = spyOn(http, 'get').and.callThrough();

      service.producersWinInterval();

      expect(spy).toHaveBeenCalledWith(environment.apiUrl + `?projection=max-min-win-interval-for-producers`);

    });

  });


});
