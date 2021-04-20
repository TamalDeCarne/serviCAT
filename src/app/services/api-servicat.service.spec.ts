import { TestBed } from '@angular/core/testing';

import { ApiServicatService } from './api-servicat.service';

describe('ApiServicatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiServicatService = TestBed.get(ApiServicatService);
    expect(service).toBeTruthy();
  });
});
