import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionComponentComponent } from './job-description-component.component';

describe('JobDescriptionComponentComponent', () => {
  let component: JobDescriptionComponentComponent;
  let fixture: ComponentFixture<JobDescriptionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDescriptionComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDescriptionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
