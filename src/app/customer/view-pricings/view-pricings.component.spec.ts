import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPricingsComponent } from './view-pricings.component';

describe('ViewPricingsComponent', () => {
  let component: ViewPricingsComponent;
  let fixture: ComponentFixture<ViewPricingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPricingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPricingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
