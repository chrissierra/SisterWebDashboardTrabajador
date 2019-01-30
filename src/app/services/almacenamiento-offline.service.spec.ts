import { TestBed } from '@angular/core/testing';

import { AlmacenamientoOfflineService } from './almacenamiento-offline.service';

describe('AlmacenamientoOfflineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlmacenamientoOfflineService = TestBed.get(AlmacenamientoOfflineService);
    expect(service).toBeTruthy();
  });
});
