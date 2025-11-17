import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegistraionService } from '../../../core/services/user-registraion.service';
import { Route, Router, TitleStrategy } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarRentServService } from '../../../core/services/car-rent-serv.service';
import { UserProfile } from '../../../core/Interface/user-profile';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../../core/services/user-profile.service';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent implements OnInit{
  profilePreviewImage: string | ArrayBuffer | null = null;
  licenceFrontPreviewImage: string | ArrayBuffer | null = null;
  licenceBackPreviewImage: string | ArrayBuffer | null = null;
  userProfile : UserProfile | null =null;
  fakePath: string | null = null;
  isUpdated: boolean = false;
  selectedGender: string = ''; // store user selection
  profileForm: FormGroup;
  userRegisterService : UserRegistraionService = inject(UserRegistraionService);
  carRentService : CarRentServService = inject(CarRentServService);
  userProfileService : UserProfileService = inject(UserProfileService);
  router : Router = inject(Router)
snackBar = inject(MatSnackBar);
 constructor(){

   this.profileForm  = new FormGroup({
   fullName: new FormControl('', Validators.required),
   email: new FormControl('', [Validators.required, Validators.email]),
   phone: new FormControl('', Validators.required),
   gender: new FormControl('', Validators.required),
   post: new FormControl(''),
   address: new FormControl(''),
   drivingLicence: new FormControl(''),
 
   // ✅ Optional: Image fields (useful if you plan to upload images to backend)
   profileImage: new FormControl<File | null>(null),
   licenceFrontImage: new FormControl<File | null>(null),
   licenceBackImage: new FormControl<File | null>(null)
 })
 }
ngOnInit(): void {
  console.log(history.state.userData)
  this.userProfile = history.state.userData;
  if(this.userProfile)
    {
    this.profileForm.patchValue({
    fullName:this.userProfile?.fullName,
    email: this.userProfile?.email,
    gender: this.userProfile?.gender,
    phone: this.userProfile?.phone,
    address: this.userProfile?.address,
    post: this.userProfile?.postCode,
    // profileImage : this.userProfile?.profileImageUrl,
    drivingLicence:this.userProfile?.drivingLicenseNo,
    // licenceBackImage : this.userProfile?.licenseBackImage, 
    // licenceFrontImage:this.userProfile?.licenseFrontImage,
});

this.profilePreviewImage = this.userProfile?.profileImageUrl;
this.licenceFrontPreviewImage= this.userProfile?.licenseFrontImage;
this.licenceBackPreviewImage= this.userProfile?.licenseBackImage;
this.isUpdated = true;

  }

console.log("image url: " , this.profileForm.get('profileImage')?.value);
}
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const id = input.id;

  if (input.files && input.files.length > 0) {
    const selectedFile = input.files[0];
    const reader = new FileReader();
    console.log("Selected File : ",selectedFile)
    reader.onload = () => {
      const result = reader.result as string;

      switch (id) {
        case "profileUpload":
          this.profilePreviewImage = result;
          this.profileForm.patchValue({ profileImage: selectedFile });
          break;
        case "licenceFrontUpload":
          this.licenceFrontPreviewImage = result;
          this.profileForm.patchValue({ licenceFrontImage: selectedFile });
          break;
        case "licenceBackUpload":
          this.licenceBackPreviewImage = result;
          this.profileForm.patchValue({ licenceBackImage: selectedFile });
          break;
      }
    };

    reader.readAsDataURL(selectedFile);
  }
}


onSubmit() {
  if (this.profileForm.invalid) {
    this.snackBar.open('Please fill all required fields.', 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
    return;
  }
  const formData = new FormData();
   
  // console.log("storedUser raw value =>", storedUser);
  
  let userId :string  =""
  if (this.isUpdated) {
     this.carRentService.userData$.subscribe(user => {
      if (user) {
        userId = user.userId;
        formData.append('UserId', userId);
        formData.append('profileId', user.profileId);
        console.log("in the stored user getting", user)
      }
    });
    }

  // Append text fields (names MUST match C# DTO properties)

formData.append('FullName', this.profileForm.get('fullName')?.value);
formData.append('Email', this.profileForm.get('email')?.value);
formData.append('Phone', this.profileForm.get('phone')?.value);
formData.append('Gender', this.profileForm.get('gender')?.value);
formData.append('PostCode', this.profileForm.get('post')?.value);
formData.append('Address', this.profileForm.get('address')?.value);
formData.append('DrivingLicenseNo', this.profileForm.get('drivingLicence')?.value);



  // Append file fields
  const profileImage = this.profileForm.get('profileImage')?.value;
  if (profileImage) formData.append('ProfileImage', profileImage);;

  const licenceFront = this.profileForm.get('licenceFrontImage')?.value;
  if (licenceFront) formData.append('LicenseFrontImage', licenceFront);

  const licenceBack = this.profileForm.get('licenceBackImage')?.value;
  if (licenceBack) formData.append('LicenseBackImage', licenceBack);

  // Add timestamps (DTO expects them)
  const now = new Date().toISOString();
  formData.append('CreatedAt', now);
  formData.append('UpdatedAt', now);

  // ✅ Debug: check actual FormData entries
  // for (const pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }
  console.log("is updated is ",this.isUpdated)
if(!this.isUpdated )
{

  // Send to backend
  this.userProfileService.creatingProfile(formData).subscribe({
    next: (res: any) => {
      if (res.status) {
        localStorage.setItem('hasProfile', JSON.stringify(true));
        this.carRentService.setUserData(res.data);
        this.snackBar.open(res.message, 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
        this.router.navigate(['home']);
      }
    },
    error: (err) => {
      console.error('Error creating profile:', err);
      this.snackBar.open('Error creating profile', 'OK', {
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
    }
  });
}
else{
  this.userProfileService.updatingUserPorfile(userId,formData).subscribe({
    next: (res: any) => {
      if (res.status) {
        localStorage.removeItem('updateProfile');
        this.carRentService.setUserData(res.data);
        this.snackBar.open(res.message, 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
        this.router.navigate(['home']);
      }
    },
    error: (err) => {
      console.error('Error updating profile:', err);
      this.snackBar.open('Error updating profile', 'OK', {
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
    }
  });
}
}
  

}
