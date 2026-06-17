import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustombookingsComponent } from './manage-custombookings.component';

describe('ManageCustombookingsComponent', () => {
  let component: ManageCustombookingsComponent;
  let fixture: ComponentFixture<ManageCustombookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCustombookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCustombookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
