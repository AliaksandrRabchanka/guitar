import { TestBed, waitForAsync } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginFormComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LoginFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
