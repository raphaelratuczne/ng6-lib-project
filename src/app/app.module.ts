import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BibliotecaExemploModule } from 'biblioteca-exemplo';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BibliotecaExemploModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
