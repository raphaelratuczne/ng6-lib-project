import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaExemploComponent } from './biblioteca-exemplo.component';

describe('BibliotecaExemploComponent', () => {
  let component: BibliotecaExemploComponent;
  let fixture: ComponentFixture<BibliotecaExemploComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliotecaExemploComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaExemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
