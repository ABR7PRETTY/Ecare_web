import { TestBed } from '@angular/core/testing';

import { AlerteSocketService } from './alerte-socket.service';

describe('AlerteSocketService', () => {
  let service: AlerteSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlerteSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
