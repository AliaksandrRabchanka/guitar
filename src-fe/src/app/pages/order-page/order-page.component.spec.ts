import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPageComponent } from './order-page.component';

describe('OrderPageComponent', () => {
  let component: OrderPageComponent;
  let fixture: ComponentFixture<OrderPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPageComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });
});
