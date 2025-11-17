import { inject, Injectable } from '@angular/core';
import { carRentApiConst } from '../constant/carRentConstant';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../Interface/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
http = inject(HttpClient);
  constructor() { }
// Creating new user profile 
  creatingProfile(formData: FormData){
  return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.profile_creating}`,formData)
}
  // updating user profile 
  updatingUserPorfile(userId : string,userProfileData : FormData)
  {
    return this.http.put(`${carRentApiConst.API_URL}${carRentApiConst.updated_user_profile}/${userId}`, userProfileData)
  }


}
