import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAdjustmentsComponent } from './payroll-adjustments.component';

describe('PayrollAdjustmentsComponent', () => {
  let component: PayrollAdjustmentsComponent;
  let fixture: ComponentFixture<PayrollAdjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollAdjustmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
