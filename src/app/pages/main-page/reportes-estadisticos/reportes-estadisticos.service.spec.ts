import { TestBed } from '@angular/core/testing';

import { ReportesEstadisticosService } from './reportes-estadisticos.service';

describe('ReportesEstadisticosService', () => {
  let service: ReportesEstadisticosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesEstadisticosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
