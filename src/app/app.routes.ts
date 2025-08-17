import { Routes } from '@angular/router';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';
import { CalaendarComponent } from './shared/reuseable/calaendar/calaendar.component';
import { RentalInfComponent } from './shared/reuseable/rental-inf/rental-inf.component';
import { FavouriteComponent } from './shared/reuseable/favourite/favourite.component';
import { HistoryCarCardComponent } from './shared/reuseable/history-car-card/history-car-card.component';
import { ProfilePageComponent } from './shared/reuseable/profile-page/profile-page.component';
import { HomeComponent } from './pages/home/home.component';
import { VehicleListingComponent } from './pages/vehicle-listing/vehicle-listing.component';
import { ContactComponent } from './pages/contact/contact.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { CarInfoComponent } from './shared/reuseable/car-info/car-info.component';
import { CustomOtpCompComponent } from './shared/reuseable/custom-otp-comp/custom-otp-comp.component';
import { DropdownProfileMenueComponent } from './shared/reuseable/dropdown-profile-menue/dropdown-profile-menue.component';



export const routes: Routes = [
  {
    path :'',
    redirectTo: 'signIn',
    pathMatch : 'full'
  },
  {
    path :'signIn',
    component : SignInComponent,data:{currentRoute:'signIn', header:false},
    // canActivate : [authGuardGuard]
  },
  {
    path:'signUp',
    component : SignInComponent,data:{currentRoute:'signUp', header:false},
    // canActivate : [authGuardGuard]
  },
  
  {
    path: 'forgetPassword',
    component : SignInComponent,data:{currentRoute:'forgetPassword', header:false},
    // canActivate : [authGuardGuard]
  },
  {
  path:'otp',
  component : SignInComponent,data:{currentRoute:'otp', header:false},
  // canActivate : [authGuardGuard]
  },
  {
  path:'newOtp',
  component : SignInComponent,data:{currentRoute:'newOtp', header:false},
  // canActivate : [authGuardGuard]
  },
  {
  path:'newPassword',
  component : SignInComponent,data:{currentRoute:'newPassword', header:false},
  // canActivate : [authGuardGuard]
  },
  
  {
    path :'calanedar',
    component : CalaendarComponent,data:{header:false},
    canActivate : [authGuardGuard]
  },
  {
    path :'rentalInfo',
    component : RentalInfComponent,data:{header:true},
    canActivate : [authGuardGuard]
  },

  {
    path :'favourite',
    component : FavouriteComponent,data:{header:true},
    canActivate : [authGuardGuard]
  },
  {
    path :'userHistory',
    component : HistoryCarCardComponent,data:{header:true},
    canActivate : [authGuardGuard]
  },
  {
    path :'profile',
    component : ProfilePageComponent,data:{header:true},
    canActivate : [authGuardGuard]
  },
  {
    path: 'home',
    component: HomeComponent,data:{header:true},
    canActivate : [authGuardGuard]
  },
  {
    path: 'vehicleListing',
    component: VehicleListingComponent,data:{currentRoute:'vehicleListing',header:true},
    canActivate : [authGuardGuard]
  },
  {
    path: 'rentNow',
    component: VehicleListingComponent,data:{currentRoute:'rentNow', header:true},
    canActivate : [authGuardGuard]
  },
 
  
  {
    path: 'contact',
    component: ContactComponent,data:{header:true},
    canActivate : [authGuardGuard]
  },
  {
    path: 'carInfo',
    component: CarInfoComponent,data:{header:true},
    canActivate : [authGuardGuard]
  },
  {
    path: 'customOtp',
    component: CustomOtpCompComponent,data:{header:false},
    canActivate : [authGuardGuard]
  },
 {
  path: 'ProfielMenue',
  component: DropdownProfileMenueComponent,
 },

  ];
  
