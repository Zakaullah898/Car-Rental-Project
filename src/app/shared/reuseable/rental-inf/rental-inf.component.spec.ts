import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalInfComponent } from './rental-inf.component';

describe('RentalInfComponent', () => {
  let component: RentalInfComponent;
  let fixture: ComponentFixture<RentalInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalInfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
