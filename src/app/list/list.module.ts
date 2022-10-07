import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListRoutingModule } from './list-routing.module';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { SharedModule } from 'src/core/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    ListMoviesComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ListModule { }
