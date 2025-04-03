import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayProgressSpinnerComponent } from './overlay-progress-spinner.component';

describe('OverlayProgressSpinnerComponent', () => {
  let component: OverlayProgressSpinnerComponent;
  let fixture: ComponentFixture<OverlayProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverlayProgressSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
