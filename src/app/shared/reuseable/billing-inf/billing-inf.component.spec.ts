import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingInfComponent } from './billing-inf.component';

describe('BillingInfComponent', () => {
  let component: BillingInfComponent;
  let fixture: ComponentFixture<BillingInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingInfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
