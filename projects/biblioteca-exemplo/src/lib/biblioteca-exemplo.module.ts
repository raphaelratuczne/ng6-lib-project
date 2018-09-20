import { NgModule } from '@angular/core';
import { BibliotecaExemploComponent } from './biblioteca-exemplo.component';
import { TesteComponent } from './teste/teste.component';

@NgModule({
  imports: [
  ],
  declarations: [
    BibliotecaExemploComponent,
    TesteComponent
  ],
  exports: [
    BibliotecaExemploComponent,
    TesteComponent
  ]
})
export class BibliotecaExemploModule { }
