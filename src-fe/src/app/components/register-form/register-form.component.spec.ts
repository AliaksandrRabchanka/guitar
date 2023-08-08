import { TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterFormComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(RegisterFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
