import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const sharedModules = [
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule
];

const sharedComponets = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...sharedModules
  ]
})
export class SharedModule { }
