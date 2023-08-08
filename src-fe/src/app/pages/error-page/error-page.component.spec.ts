import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageComponent } from './error-page.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPageComponent ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });
});
