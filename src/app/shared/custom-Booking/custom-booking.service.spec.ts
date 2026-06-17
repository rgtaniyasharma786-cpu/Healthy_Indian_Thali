import { TestBed } from '@angular/core/testing';

import { CustomBookingService } from './custom-booking.service';

describe('CustomBookingService', () => {
  let service: CustomBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
