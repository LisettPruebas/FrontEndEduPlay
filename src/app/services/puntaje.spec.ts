import { TestBed } from '@angular/core/testing';

import { Puntaje } from './puntaje';

describe('Puntaje', () => {
  let service: Puntaje;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Puntaje);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
