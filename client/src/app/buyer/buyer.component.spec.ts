import { ComponentFixture, TestBed } from '@angular/core/testing';

import { buyerComponent } from './buyer.component';

describe('buyerComponent', () => {
  let component: buyerComponent;
  let fixture: ComponentFixture<buyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ buyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(buyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
