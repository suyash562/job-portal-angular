import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmployersComponent } from './verify-employers.component';

describe('VerifyEmployersComponent', () => {
  let component: VerifyEmployersComponent;
  let fixture: ComponentFixture<VerifyEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyEmployersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
