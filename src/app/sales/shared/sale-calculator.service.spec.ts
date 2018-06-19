import { TestBed, inject } from '@angular/core/testing';

import { SaleCalculator } from './sale-calculator.service';

describe('SaleCalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleCalculator]
    });
  });

  it('should be created', inject([SaleCalculator], (service: SaleCalculator) => {
    expect(service).toBeTruthy();
  }));
});
