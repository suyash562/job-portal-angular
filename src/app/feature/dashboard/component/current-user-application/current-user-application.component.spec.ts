import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserApplicationComponent } from './current-user-application.component';

describe('CurrentUserApplicationComponent', () => {
  let component: CurrentUserApplicationComponent;
  let fixture: ComponentFixture<CurrentUserApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentUserApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentUserApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
