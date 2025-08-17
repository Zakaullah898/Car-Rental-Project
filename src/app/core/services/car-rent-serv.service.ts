import { inject, Injectable } from '@angular/core';
import {  Observable, Subject,  } from 'rxjs';
import {  rentCarCard } from '../models/class/class';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { carRentApiConst } from '../constant/carRentConstant';

@Injectable({
  providedIn: 'root'
})
export class CarRentServService {
public carData : Subject<rentCarCard> = new Subject<rentCarCard>;
private getAllCarsApi =`${carRentApiConst.API_URL}${carRentApiConst.GET_ALL_USER}`

http = inject(HttpClient)
  constructor() { 
    // debugger
    // console.log(this.gettingEmail.next)
  }
  // getCars(): Observable<any> {
  //   return this.http.get(this.getAllCarsApi);
  // }
  // convertBase64ToImage(base64String: string, imageType: string): any{
    
  //   return data :${imageType};base64,${base64String};
  // }
  // processCarData(cars: any[]): any[] {
  //   return cars.map((car) => {
  //     if (car.image && car.imageType) {
  //       car.imageUrl = this.convertBase64ToImage(car.image, car.imageType);
  //     }
  //     return car;
  //   });
  // }

  submitSignUp (obj : any){
       return   this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.USER_REGIST}`,obj)
      //  return   this.http.post(`https://aqueous-earth-02633-e729ae53b1b3.herokuapp.com/api/auth/register`,obj)
      //  return this.http.post('http://192.168.100.22:8080/api/auth/register',obj)

  }
  submitSignIn(obj : any){
    // const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.USER_LOGIN}`,obj)
    // return this.http.post(`https://aqueous-earth-02633-e729ae53b1b3.herokuapp.com/api/auth/login`,obj)
   
  }

  onOtpSubmit(formData: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    return this.http.post(`${carRentApiConst.API_URL}auth/verify-otp?email}`,formData,{headers})
    // return this.http.post('http://192.168.100.22:8080/api/auth/verify-otp', formData, {headers});
  }
  onResendOtp(obj : any){
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    // return this.http.post('https://aqueous-earth-02633-e729ae53b1b3.herokuapp.com/api/auth/verify-acc?', obj);
    // return this.http.post('http://192.168.100.22:8080/api/auth/verify-acc',obj, {headers})
  return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.RESEND_VERYFI_OTP}`,obj, {headers})
 }

 forgetPassword(obj : any){
  const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
  return   this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.FORGET_PASSWORD}`,obj,{headers})

}
resetPasswordOTP(formData: any){
  const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.RESETPASOTP}`,formData,{headers})
}
resetNewPass(formData :any){
  const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
  return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.RESETPASSWORD}`,formData,{headers})
}
getAllCars(){
  return this.http.get(`${carRentApiConst.API_URL}${carRentApiConst.GET_ALL_USER}`)
}
}
