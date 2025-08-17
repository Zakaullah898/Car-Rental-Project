import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOtpCompComponent } from './custom-otp-comp.component';

describe('CustomOtpCompComponent', () => {
  let component: CustomOtpCompComponent;
  let fixture: ComponentFixture<CustomOtpCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomOtpCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomOtpCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
