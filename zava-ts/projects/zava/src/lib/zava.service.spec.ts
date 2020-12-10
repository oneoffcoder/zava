import { TestBed } from '@angular/core/testing';

import { ZavaService } from './zava.service';

describe('ZavaService', () => {
  let service: ZavaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZavaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
