import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const sharedModules = [
  ReactiveFormsModule,
  FormsModule,
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
