import { CommonModule,  } from '@angular/common';
import {  Component, inject, OnInit, resolveForwardRef,  } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CarRentServService } from '../../../core/services/car-rent-serv.service';
import { HttpClient, HttpErrorResponse,  } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import {  catchError, Subscription, throwError, timer } from 'rxjs';
import { FormatTimePipe } from '../../../format-time.pipe';
import { state } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UserRegistraionService } from '../../../core/services/user-registraion.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule,RouterModule,ReactiveFormsModule,NgOtpInputModule,FormatTimePipe],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  isIconVIs?: boolean;
  isVisible ? : boolean;
  changeType?: boolean;
  isSignImgVisi!: boolean;
  currentRoute : string = 'signIn'
  toggleNewPasword?: boolean;
  showSignIn?:boolean = true;
  isSignUp : boolean =false;
  loginFormValue : any;
countDown!: Subscription;
counter = 60;
pgValue = 100;
 http = inject(HttpClient)
 userRegistrationService : UserRegistraionService = inject(UserRegistraionService)
 carRentService : CarRentServService = inject(CarRentServService)
 logInForm: FormGroup;

  config = {
    length: 5,
    inputClass: 'custom-otp-input',
  }

  constructor(private activateroute:ActivatedRoute,private router:Router, private breakpoints: BreakpointObserver ){
  this.activateroute.data.subscribe((res : any)=>{
    this.currentRoute = res.currentRoute
  })
  

  this.logInForm = new FormGroup({
    email : new FormControl('',[Validators.email]),
    password : new FormControl(''),
    name : new FormControl('',[Validators.required]),
    phoneNumber : new FormControl('',[Validators.required]),
    newPassword : new FormControl(''),
    otpCode : new FormControl(''),
  })
  // this.carRentServ.gettingEmail.subscribe((res: any)=>{
    // // console.log('this Email is Gettng:',res)
    // this.logInForm.get('email')?.setValue(res)
    // console.log(res)
    // })

    

}



ngOnInit() {
  this.countDown = timer(0, 1000).subscribe(() => {
    --this.counter;
    if (this.counter === 0) {
      this.countDown.unsubscribe();
    }

  });

  
  this.logInForm.get('otpCode')?.setValue(history.state.otpCode)
    this.logInForm.get('email')?.setValue(history.state.email)
    this.isSignUp = history.state.isSignUp; 
    console.log("oninte : ",history.state)

    this.breakpoints.observe([
      '(max-width:800px)'
    ]).subscribe((res:BreakpointState)=>{
      if(res.matches){
        this.isSignImgVisi = false
      }
      else{
        this.isSignImgVisi = true
      }
    })
}

// setProgressBarValue(value: number, total: number) {
//   this.pgValue = (100 * value) / total;
// }


  showPass(){
    this.isIconVIs = !this.isIconVIs
 this.changeType = !this.changeType
  }
  showNewPass(){
    this.toggleNewPasword = !this.toggleNewPasword
  }
     goToSignIn(){
       this.router.navigateByUrl('signIn')
     }
     goToSignUp(){
       this.router.navigateByUrl('signUp')
     }

     onSignUp(val :any){
      const ob={
        userName:this.logInForm.get('name')?.value,
        password:this.logInForm.get('password')?.value,
        email: this.logInForm.get('email')?.value,
        phone:this.logInForm.get('phoneNumber')?.value,
      }
                this.userRegistrationService.submitSignUp(ob).subscribe((res: any)=>{
                  if(res){
                    
                    this.router.navigate(['/otp'], { state : { email:ob.email, isSignUp : true } })
                    // this.router.navigateByUrl('otp')
                  }
                  else{
                    res
                  }
                 console.log('This is post api :', res)
                })

                  
                  
     }

  onSignIn(){
    
    const ob={
      email: this.logInForm.get('email')?.value,
      password:this.logInForm.get('password')?.value
    }
      if (!ob.email || !ob.password)
    {
      alert('Email OR Password field is empty');
      return;
    }
    else
    {
      this.userRegistrationService.submitSignIn(ob).subscribe((res : any)=>{
      if(res.status){
        console.log("Login user data ",res)
        localStorage.setItem('userToken', res.data.tokenData.token);
        const expireDate = Date.now() + res.data.tokenData.expiresIn * 60 * 1000; // 4 minutes from now
        localStorage.setItem('expiresIn', expireDate.toString());
        // localStorage.setItem('superUser', JSON.stringify(res.data.userData));
        localStorage.setItem("userId",res.data.userId)
        this.carRentService.setUserData(res.data.userData)
        localStorage.setItem('hasProfile', JSON.stringify(res.data.hasProfile));
        if(res.data.hasProfile){
          this.router.navigateByUrl('home')
        }
        else
        {
          this.router.navigate(['profile-form'])
        }
      }
      else if(res.statusCode === 400){
        alert('Wrong Credntial')
      }
       else if(res.statusCode === 404){
        alert(`User not found wiht this ${ob.email}`)
        console.log(res.errors[0])
      }
      else if(res.statusCode === 500){
        alert('Internal Server error')
      }
     
      else{
        alert('An unexpected error occurred');
      }
    })
     }
  }
  onOtpChange(value: string): void {
    // console.log(value);
    this.logInForm.get('otpCode')?.setValue(value)
        // console.log(otpVal)
       

  }

  VerifyOtp(){
    // const getEmail = localStorage.getItem('gettingEmail')
    // this.logInForm.get('email')?.setValue(getEmail)

    // const ob = new URLSearchParams();
    
    // ob.set('email',this.logInForm.get('email')?.value);
    // ob.set('',this.logInForm.get('otpField')?.value);
    const ob={
      email: this.logInForm.get('email')?.value,
      otpCode:this.logInForm.get('otpCode')?.value
    }
    
    console.log("Otp result: ", ob, "And ",this.isSignUp)
    this.userRegistrationService.verifyOtp(ob).subscribe((res : any)=>{
      console.log("Otp result: ", res)
      if(res.status && this.isSignUp){

        this.router.navigate(['/signIn'])
        this.isSignUp = false
      }
      else if(res.status == true && this.isSignUp == undefined){
        this.router.navigate(['/newPassword'],
        { state: { email:this.logInForm.get('email')?.value ,otpCode:this.logInForm.get('otpCode')?.value  } })
      }
      else{
        alert('Invalid OTP')
      }
    })
    
    }
 resendOtp(){

  const obj = 
  {
    email: this.logInForm.get('email')?.value
  }
  
  // ob.set('email',this.logInForm.get('email')?.value);
  this.userRegistrationService.onResendOtp(obj).subscribe((res:any)=>{
    if(res.status){
      console.log(res)
      alert(res.data.message)
    }
  })
 }
 forgetPassword(){
   
  

    const ob={
      email: this.logInForm.get('email')?.value
    }
    
 
    this.userRegistrationService.forgetPassword(ob).subscribe((res : any)=>{
      console.log(res);
      if(res.status){
        this.router.navigate(['/newOtp'], { state: { email:this.logInForm.get('email')?.value  } });

      }
      
      // if(res){
      
    })
         
}
resendNewOtp(){
 
  // const obj = {
  //   email:this.logInForm.get('email')?.value,
  //   otp:this.logInForm.get('otpField')?.value
  // }

  const ob = new URLSearchParams();
    
    ob.set('email',this.logInForm.get('email')?.value);
    ob.set('otp',this.logInForm.get('otpCode')?.value);
  // this.carRentServ.resetPasswordOTP(ob.toString()).subscribe((res : any)=>{
  //   if(res){
  //     localStorage.setItem('userToken',res.data.jwtToken)
  //   this.router.navigate(['/newPassword'], { state: { email:this.logInForm.get('email')?.value , otp: this.logInForm.get('otpField')?.value } })
  //   }
  //   else{
  //     alert('Invalid OTP')
  //   }
  // })
}
resetPassword(){
  // const ob = new URLSearchParams();
   const  password = this.logInForm.get('password')?.value
    const conformPassword = this.logInForm.get('newPassword')?.value
    // ob.set('email',this.logInForm.get('email')?.value);
    // ob.set('newPassword',newPassword);
    const ob={
      email: this.logInForm.get('email')?.value,
      newPassword: conformPassword,
      otpCode:this.logInForm.get('otpCode')?.value
    }
    console.log("The new password set : ",ob)
    if(conformPassword === password){
        this.userRegistrationService.resetNewPass(ob).subscribe((res:any)=>{
          console.log("The new password set : ",res,"Is : ",conformPassword === password)
          if(res.status){
            this.router.navigate(['/signIn'])
          }
    })
    }
    else
      {
        alert("password and conform password are not equal")
      }
  
}
}
