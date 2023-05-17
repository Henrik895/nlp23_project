import { TestBed } from '@angular/core/testing';

import { PilotApiService } from './pilot-api.service';

describe('PilotApiService', () => {
  let service: PilotApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PilotApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
