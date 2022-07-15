import { TestBed } from '@angular/core/testing';

import { ThankYouService } from './thank-you.service';

describe('ThankYouService', () => {
  let service: ThankYouService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThankYouService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
