import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListYearMultipleWinnersComponent } from './components/list-year-multiple-winners/list-year-multiple-winners.component';
import { TopStudioWinnersComponent } from './components/top-studio-winners/top-studio-winners.component';
import { IntervalBetweenWinsComponent } from './components/interval-between-wins/interval-between-wins.component';
import { ListMovieWinnersYearComponent } from './components/list-movie-winners-year/list-movie-winners-year.component';
import { SharedModule } from 'src/core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ListYearMultipleWinnersComponent,
    TopStudioWinnersComponent,
    IntervalBetweenWinsComponent,
    ListMovieWinnersYearComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
