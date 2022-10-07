import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DefaultSpinnerComponent } from './components/spinners/default-spinner/default-spinner.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog/error-dialog.component';


const sharedModules = [
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
];

const sharedComponets = [
  DefaultSpinnerComponent
];

@NgModule({
  declarations: [
    DefaultSpinnerComponent,
    ...sharedComponets,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    ...sharedModules
  ],
  exports: [
    DefaultSpinnerComponent
  ]
})
export class SharedModule { }
