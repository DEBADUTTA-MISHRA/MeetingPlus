import { Component } from '@angular/core';
import { UserloginService } from '../services/userlogin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in-psw',
  templateUrl: './sign-in-psw.component.html',
  styleUrls: ['./sign-in-psw.component.scss']
})
export class SignInPswComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private loginService: UserloginService, private router:Router, private toastr: ToastrService) { }

  
  login() {
    this.loginService.login(this.email, this.password).subscribe(
      success => {
          console.log("success",success);
          console.log('token',success.data.token);
          if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('token',success.data.token);
          }
          console.log('token',success.data.token);
          this.toastr.success("Login Successful","success");
          this.router.navigate(['/home']);
      },
      error => {
        this.toastr.error("invalid User","Invalid");
      }
    );
  }

  signUp(){
    this.router.navigate(['/signUp']);
  }
}
