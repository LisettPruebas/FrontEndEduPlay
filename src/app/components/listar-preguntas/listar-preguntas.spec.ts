import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPreguntas } from './listar-preguntas';

describe('ListarPreguntas', () => {
  let component: ListarPreguntas;
  let fixture: ComponentFixture<ListarPreguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPreguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPreguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
