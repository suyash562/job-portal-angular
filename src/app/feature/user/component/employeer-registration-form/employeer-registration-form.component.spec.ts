import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerRegistrationFormComponent } from './employeer-registration-form.component';

describe('EmployeerRegistrationFormComponent', () => {
  let component: EmployeerRegistrationFormComponent;
  let fixture: ComponentFixture<EmployeerRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeerRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeerRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
