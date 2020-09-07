import { TestBed } from '@angular/core/testing';

import { HttpcommunicationService } from './_services/httpcommunication.service';

describe('HttpserviceService', () => {
  let service: HttpcommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpcommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
