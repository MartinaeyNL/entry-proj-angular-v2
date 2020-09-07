import { TestBed } from '@angular/core/testing';

import { CurrentuserService } from './_services/currentuser.service';

describe('UserserviceService', () => {
  let service: CurrentuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
