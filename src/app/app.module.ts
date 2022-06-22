import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/fr';
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";


registerLocaleData(localePt,'pt');
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    InputTextModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt'}, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
