import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformationMessagComponent } from './conformation-messag.component';

describe('ConformationMessagComponent', () => {
  let component: ConformationMessagComponent;
  let fixture: ComponentFixture<ConformationMessagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConformationMessagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConformationMessagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
