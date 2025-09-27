import { TestBed } from '@angular/core/testing';

import { AccessGuard } from './access-guard';

describe('AccessGuard', () => {
  let service: AccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
