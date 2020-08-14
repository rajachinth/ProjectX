import { TestBed } from '@angular/core/testing';

import { UniqueDataCheckService } from './unique-data-check.service';

describe('UniqueDataCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniqueDataCheckService = TestBed.get(UniqueDataCheckService);
    expect(service).toBeTruthy();
  });
});
