import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCarCardComponent } from './history-car-card.component';

describe('HistoryCarCardComponent', () => {
  let component: HistoryCarCardComponent;
  let fixture: ComponentFixture<HistoryCarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryCarCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
