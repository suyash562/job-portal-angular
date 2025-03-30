import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedApplicationComponent } from './view-selected-application.component';

describe('ViewSelectedApplicationComponent', () => {
  let component: ViewSelectedApplicationComponent;
  let fixture: ComponentFixture<ViewSelectedApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSelectedApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSelectedApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
