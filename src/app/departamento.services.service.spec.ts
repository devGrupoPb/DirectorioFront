import { TestBed } from '@angular/core/testing';

import { Departamento.ServicesService } from './departamento.services.service';

describe('Departamento.ServicesService', () => {
  let service: Departamento.ServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Departamento.ServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
