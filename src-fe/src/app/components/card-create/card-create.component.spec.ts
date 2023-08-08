import { TestBed, waitForAsync } from '@angular/core/testing';
import { CardCreateComponent } from './card-create.component';

describe('CardCreateComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardCreateComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CardCreateComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
