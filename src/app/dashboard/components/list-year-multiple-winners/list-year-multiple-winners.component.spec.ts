import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYearMultipleWinnersComponent } from './list-year-multiple-winners.component';

describe('ListYearMultipleWinnersComponent', () => {
  let component: ListYearMultipleWinnersComponent;
  let fixture: ComponentFixture<ListYearMultipleWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListYearMultipleWinnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListYearMultipleWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
