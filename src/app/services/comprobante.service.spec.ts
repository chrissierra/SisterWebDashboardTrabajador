import { TestBed } from '@angular/core/testing';

import { ComprobanteService } from './comprobante.service';

describe('ComprobanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComprobanteService = TestBed.get(ComprobanteService);
    expect(service).toBeTruthy();
  });
});
