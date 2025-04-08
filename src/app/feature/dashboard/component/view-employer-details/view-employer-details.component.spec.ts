import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployerDetailsComponent } from './view-employer-details.component';

describe('ViewEmployerDetailsComponent', () => {
  let component: ViewEmployerDetailsComponent;
  let fixture: ComponentFixture<ViewEmployerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEmployerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmployerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
