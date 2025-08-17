import { CommonModule,  } from '@angular/common';
import {  Component, inject, OnInit,  } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CarRentServService } from '../../../core/services/car-rent-serv.service';
import { HttpClient, HttpErrorResponse,  } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import {  catchError, Subscription, throwError, timer } from 'rxjs';
import { FormatTimePipe } from '../../../format-time.pipe';
import { state } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
  loginFormValue : any;
countDown!: Subscription;
counter = 60;
pgValue = 100;
 http = inject(HttpClient)
 carRentServ = inject(CarRentServService)
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
    otpField : new FormControl(''),
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

  
    this.logInForm.get('email')?.setValue(history.state.email)
    this.logInForm.get('otpFiel')?.setValue(history.state.otp)
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
        name:this.logInForm.get('name')?.value,
        email: this.logInForm.get('email')?.value,
        password:this.logInForm.get('password')?.value,
        phoneNumber:this.logInForm.get('phoneNumber')?.value,
      }
                this.carRentServ.submitSignUp(ob).subscribe((res: any)=>{
                  if(res){
                    
                    this.router.navigate(['/otp'], { state : { email:ob.email } })
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
    
    // this.carRentServ.submitSignIn(ob).pipe(catchError((error)=>{
    //   if(error.status=== 401){
    //     alert('Wrong Credntial')
    //   }
    //   else if(error.status === 500){
    //     alert('Internal Server error')
    //   }
    //   else{
    //     alert('An unexpected error occurred');
    //   }
    //   return throwError(error)
    // })).subscribe((res : any)=>{
    //   if(res){
    //     localStorage.setItem('userToken',res.data.jwtToken)
    //     this.router.navigateByUrl('home')
    //   }
    //   else if(res.status ===401) {
    //     alert('Wrong Credential')
    //   }
    // })
    
  if(ob.email =='zakaullahlaar9@gmail.com' && ob.password==12345){
     localStorage.setItem('userEmail','zakaullahlaar9@gmail.com')
     this.router.navigateByUrl('home')
  }
  else{
    alert('Wrong Credential')
  }
  }
  onOtpChange(value: string): void {
    // console.log(value);
    this.logInForm.get('otpField')?.setValue(value)
        // console.log(otpVal)
       

  }

  getOtp(){
    // const getEmail = localStorage.getItem('gettingEmail')
    // this.logInForm.get('email')?.setValue(getEmail)

    const ob = new URLSearchParams();
    
    ob.set('email',this.logInForm.get('email')?.value);
    ob.set('otp',this.logInForm.get('otpField')?.value);
    
    this.carRentServ.onOtpSubmit(ob.toString()).subscribe((res : any)=>{
      if(res){
        localStorage.setItem('userToken',res.data.jwtToken)

      //  this.router.navigateByUrl('home').then(()=>{
      //   this.carRentServ.gettingEmail.subscribe((res: any)=>{
         
      //     this.logInForm.get('email')?.setValue(res)
      //     console.log(res)
      //     })
      // })
      this.router.navigate(['/home'])
      }
      else{
        alert('Invalid OTP')
      }
    })
    
    
    
 
    
    }
 resendOtp(){

  const ob = new URLSearchParams();
  
  ob.set('email',this.logInForm.get('email')?.value);
  this.carRentServ.onResendOtp(ob.toString()).subscribe((res:any)=>{
    alert(res)
  })
 }
 getNewOtp(val: any){
   
  

    const ob = new URLSearchParams();
    
 
    ob.set('email',this.logInForm.get('email')?.value);
    this.carRentServ.forgetPassword(ob.toString()).subscribe((res : any)=>{
      console.log(res.status);if(res.status){
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
    ob.set('otp',this.logInForm.get('otpField')?.value);
  this.carRentServ.resetPasswordOTP(ob.toString()).subscribe((res : any)=>{
    if(res){
      localStorage.setItem('userToken',res.data.jwtToken)
    this.router.navigate(['/newPassword'], { state: { email:this.logInForm.get('email')?.value , otp: this.logInForm.get('otpField')?.value } })
    }
    else{
      alert('Invalid OTP')
    }
  })
}
resetPassword(){
  const ob = new URLSearchParams();
   const  password2 = this.logInForm.get('password')?.value
    const newPassword = this.logInForm.get('newPassword')?.value
    ob.set('email',this.logInForm.get('email')?.value);
    ob.set('newPassword',newPassword);
    this.carRentServ.resetNewPass(ob.toString()).subscribe((res:any)=>{
      if(res && password2 === newPassword){
        this.router.navigate(['/home'])
      }
    })
}
}
