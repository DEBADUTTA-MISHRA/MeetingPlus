import { Component } from '@angular/core';
import { UserloginService } from '../services/userlogin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin-otp',
  templateUrl: './signin-otp.component.html',
  styleUrl: './signin-otp.component.scss'
})
export class SigninOtpComponent {


  constructor(private login: UserloginService, private router:Router, private toastr:ToastrService) {}

  email: any = '';
  otpSent: boolean = false;
  message:any;
  error:boolean=false;
 

  sendOtp() {
    const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(emailregex.test(this.email)){
    this.login.sendOtp(this.email).subscribe(
      (response: any) => {
        if (response.success) {
          this.login.setEmail(this.email); 
          this.otpSent = true;
          this.toastr.success('OTP sent successfully!');
          this.router.navigate(['/verifyotp'])
        } else {
          this.toastr.error('Failed to send OTP');
        }
      },
      error => {
        console.error('Error sending OTP', error);
        this.toastr.error('Error sending OTP');
      }
    );
  }
else{
  this.error=true;
  this.message='Please enter a valid email'
}
}
}
