import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/core/shared/shared.module';

import { IntervalBetweenWinsComponent } from './interval-between-wins.component';

describe('IntervalBetweenWinsComponent', () => {
  let component: IntervalBetweenWinsComponent;
  let fixture: ComponentFixture<IntervalBetweenWinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntervalBetweenWinsComponent],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalBetweenWinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
