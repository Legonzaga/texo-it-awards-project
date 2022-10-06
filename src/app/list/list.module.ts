import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListRoutingModule } from './list-routing.module';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';



@NgModule({
  declarations: [
    ListComponent,
    ListMoviesComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule
  ]
})
export class ListModule { }
