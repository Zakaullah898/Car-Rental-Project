import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownProfileMenueComponent } from './dropdown-profile-menue.component';

describe('DropdownProfileMenueComponent', () => {
  let component: DropdownProfileMenueComponent;
  let fixture: ComponentFixture<DropdownProfileMenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownProfileMenueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownProfileMenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
