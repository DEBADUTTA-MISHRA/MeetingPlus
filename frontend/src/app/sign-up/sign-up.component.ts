import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepService } from '../services/step/step.service';
import { UserloginService } from '../services/userlogin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  currentStep: number = 1;
  signUpForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private stepService: StepService,
    private userService: UserloginService,
    private fb: FormBuilder,
    private toastr:ToastrService,
    private route: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      name: ['', Validators.required],
      organisation:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.stepService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }

  continue() {
    if (this.currentStep === 1 && this.signUpForm.controls['email'].valid && this.signUpForm.controls['phone'].valid) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.signUpForm.controls['name'].valid && this.signUpForm.controls['organisation'].valid) {
      this.currentStep = 3;
    } else if (this.currentStep === 3 && this.signUpForm.controls['password'].valid && this.signUpForm.controls['confirmPassword'].valid) {
      this.errorMessage = 'Click register to sign up.';
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  register() {
    if (this.currentStep === 3 && this.signUpForm.valid && this.signUpForm.controls['password'].value === this.signUpForm.controls['confirmPassword'].value) {
      const payload = {
        email: this.signUpForm.controls['email'].value,
        phone: this.signUpForm.controls['phone'].value,
        name: this.signUpForm.controls['name'].value,
        organisation:this.signUpForm.controls['organisation'].value,
        password: this.signUpForm.controls['password'].value,
        // confirmPassword: this.signUpForm.controls['confirmPassword'].value
      };
      console.log('Registering user with data:', payload);
      this.userService.signUp(payload).subscribe(data => {
        this.toastr.success('Registration successful');
        this.route.navigate(['/signin']);
        console.log('Registration successful:', data); 
        this.errorMessage = ''; 
      }, error => {
        this.toastr.success('Registration failed. Please try again.');
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        console.log('Registration error:', error); 
      });
    } else {
      this.errorMessage = 'All fields are required and passwords must match.';
    }
  }
  
  
}
