import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserloginService } from '../services/userlogin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss'
})
export class VerifyOtpComponent {
  myGroup!: FormGroup<any>;
  otp:any;


  constructor(private userService:UserloginService, private router:Router, private fb:FormBuilder, private toastr:ToastrService){}

  ngOnInit() {
    this.myGroup = this.fb.group({
      value1: [''],
      value2: [''],
      value3: [''],
      value4: [''],
      value5: [''],
      value6: [''],
    });
  }
  getOtpValue() {
    const otpValue = this.myGroup.get('value1')?.value +
                     this.myGroup.get('value2')?.value +
                     this.myGroup.get('value3')?.value +
                     this.myGroup.get('value4')?.value +
                     this.myGroup.get('value5')?.value +
                     this.myGroup.get('value6')?.value;

    return otpValue;
  }


  signIn() {
    if (this.myGroup.valid) {
      this.otp = this.getOtpValue();
      const email = this.userService.getEmail();  // Retrieve the stored email
      
      if (email) {
        this.userService.verifyOtp({ email: email, otp: this.otp }).subscribe(
          (response) => {
            if (response.success) {
              this.toastr.success(response.message);
              this.router.navigate(['/home']);
            } else {
              this.toastr.error(response.message);
            }
          },
          (error) => {
            console.error('Error verifying OTP', error);
            this.toastr.error('Error verifying OTP');
          }
        );
      } else {
        console.error('Email not found');
        this.toastr.error('Email not found. Please retry the process.');
      }
    } else {
      console.log('Form is invalid');
    }
  }  
}
