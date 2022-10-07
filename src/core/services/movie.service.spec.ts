import { TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/shared.module';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ]
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
