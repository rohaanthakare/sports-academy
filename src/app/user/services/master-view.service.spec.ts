import { TestBed } from '@angular/core/testing';

import { MasterViewService } from './master-view.service';

describe('MasterViewService', () => {
  let service: MasterViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
