import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalaendarComponent } from './calaendar.component';

describe('CalaendarComponent', () => {
  let component: CalaendarComponent;
  let fixture: ComponentFixture<CalaendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalaendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalaendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
