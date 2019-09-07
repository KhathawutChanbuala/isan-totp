import { TestBed } from '@angular/core/testing';

import { NewISANOTPService } from './new-isan-otp.service';

describe('NewISANOTPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewISANOTPService = TestBed.get(NewISANOTPService);
    expect(service).toBeTruthy();
  });
});
