import { TestBed } from '@angular/core/testing';

import { BibliotecaExemploService } from './biblioteca-exemplo.service';

describe('BibliotecaExemploService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BibliotecaExemploService = TestBed.get(BibliotecaExemploService);
    expect(service).toBeTruthy();
  });
});
