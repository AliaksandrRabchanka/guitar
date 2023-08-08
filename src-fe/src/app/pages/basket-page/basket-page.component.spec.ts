import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketPageComponent } from './basket-page.component';

describe('BasketPageComponent', () => {
  let component: BasketPageComponent;
  let fixture: ComponentFixture<BasketPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketPageComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });
});
