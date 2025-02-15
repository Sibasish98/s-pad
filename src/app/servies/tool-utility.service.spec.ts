import { TestBed } from '@angular/core/testing';

import { ToolUtilityService } from './tool-utility.service';

describe('ToolUtilityService', () => {
  let service: ToolUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
