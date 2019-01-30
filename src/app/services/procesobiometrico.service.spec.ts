import { TestBed } from '@angular/core/testing';

import { ProcesobiometricoService } from './procesobiometrico.service';

describe('ProcesobiometricoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcesobiometricoService = TestBed.get(ProcesobiometricoService);
    expect(service).toBeTruthy();
  });
});
