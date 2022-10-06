import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovieWinnersYearComponent } from './list-movie-winners-year.component';

describe('ListMovieWinnersYearComponent', () => {
  let component: ListMovieWinnersYearComponent;
  let fixture: ComponentFixture<ListMovieWinnersYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMovieWinnersYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMovieWinnersYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
