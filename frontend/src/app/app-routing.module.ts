import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInPswComponent } from './sign-in-psw/sign-in-psw.component';
import { SigninOtpComponent } from './signin-otp/signin-otp.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'', component:SigninOtpComponent},
  {path:'signin', component:SignInPswComponent},
  {path:'home', component:HomepageComponent},
  {path:'verifyotp', component:VerifyOtpComponent},
  {path:'signUp', component:SignUpComponent},
  {path:'**', redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
