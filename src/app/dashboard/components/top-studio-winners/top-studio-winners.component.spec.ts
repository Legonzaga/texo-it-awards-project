import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/core/shared/shared.module';

import { TopStudioWinnersComponent } from './top-studio-winners.component';

describe('TopStudioWinnersComponent', () => {
  let component: TopStudioWinnersComponent;
  let fixture: ComponentFixture<TopStudioWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStudioWinnersComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStudioWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
