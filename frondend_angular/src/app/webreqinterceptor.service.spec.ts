import { TestBed } from '@angular/core/testing';

import { WebreqinterceptorService } from './webreqinterceptor.service';

describe('WebreqinterceptorService', () => {
  let service: WebreqinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebreqinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
