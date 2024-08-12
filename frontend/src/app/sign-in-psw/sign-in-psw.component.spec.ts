import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPswComponent } from './sign-in-psw.component';

describe('SignInPswComponent', () => {
  let component: SignInPswComponent;
  let fixture: ComponentFixture<SignInPswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInPswComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInPswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
