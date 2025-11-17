import { inject, Injectable } from '@angular/core';
import { carRentApiConst } from '../constant/carRentConstant';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRegistraionService {

  private tokenTimer: any;
  http :HttpClient = inject(HttpClient)
  router : Router = inject(Router)
  constructor() { }

  submitSignUp (obj : any){
       return   this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.USER_REGIST}`,obj)
      //  return   this.http.post(`https://aqueous-earth-02633-e729ae53b1b3.herokuapp.com/api/auth/register`,obj)
      //  return this.http.post('http://192.168.100.22:8080/api/auth/register',obj)

  }
  submitSignIn(obj : any){
    // const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    console.log("in the service : ",obj)
    return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.USER_LOGIN}`,obj)
    // return this.http.post(`https://aqueous-earth-02633-e729ae53b1b3.herokuapp.com/api/auth/login`,obj)
   
  }

  verifyOtp(formData: any) {
    console.log("in the service class otp : ",formData)
    return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.OTP_VERYFI}`,formData,)
  }
  onResendOtp(obj : any){
  return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.RESEND_VERYFI_OTP}`,obj)
 }

 forgetPassword(obj : any){
  console.log("in the service forget  password : ",obj)
  return   this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.FORGET_PASSWORD}`,obj)

}
resetPasswordOTP(formData: any){

    // return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.RESETPASOTP}`,formData,{headers})
}
resetNewPass(formData :any){

  return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.RESETPASSWORD}`,formData)
}

logOut(){
  localStorage.removeItem('userToken');
  localStorage.removeItem('hasProfile');
  localStorage.removeItem('superUser')
  localStorage.removeItem('userId')
  localStorage.removeItem("expiresIn")
  clearTimeout(this.tokenTimer);
  this.router.navigate(['/signIn'])
}
setAutoLogin(){
  const token = localStorage.getItem('userToken');
  const expireTime = localStorage.getItem('expiresIn')
  if(!token || !expireTime){
    return
  }
   // Convert stored expiration time to number
  const expirationDate = Number(expireTime);
  const expiresIn = expirationDate - Date.now(); // remaining time in ms

  console.log("⏳ Remaining time (ms):", expiresIn);

  console.log(" aotuo ",expiresIn)
  if(expiresIn > 0){
    this.setAutLogOut(expiresIn)
  }
  else{
    this.logOut()
  }
}
setAutLogOut(duration : number){
  this.tokenTimer = setTimeout(()=>{
    this.logOut();
  },duration)
  console.log(`🚨 Auto logout in: ${duration / 1000} seconds`);
}
}
