import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEspecilidadComponent } from './crear-especilidad.component';

describe('CrearEspecilidadComponent', () => {
  let component: CrearEspecilidadComponent;
  let fixture: ComponentFixture<CrearEspecilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEspecilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEspecilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
