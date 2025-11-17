import { Component, DoCheck, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'; // Import the Xmark icon
import { DropdownProfileMenueComponent } from '../../shared/reuseable/dropdown-profile-menue/dropdown-profile-menue.component';
import { ClickOutsideDirective } from '../../core/customDirective/click-outside.directive';
import { state } from '@angular/animations';
import { CarRentServService } from '../../core/services/car-rent-serv.service';
import { UserRegistraionService } from '../../core/services/user-registraion.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,FontAwesomeModule,RouterLinkActive,DropdownProfileMenueComponent,ClickOutsideDirective],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isMenuShow!:boolean;
  isMenueActive: boolean =true;
  displayMenue !: boolean;
  isProfileDisplay! : boolean;
  menueBar=faBars;
  crossBar = faXmark;
  profileImage! : string;
  carRentService : CarRentServService = inject(CarRentServService);
  userRegisterService :UserRegistraionService = inject(UserRegistraionService)
  
constructor(private breakpointObserver: BreakpointObserver, private router: Router){

}
ngOnInit(): void {
  this.breakpointObserver.observe([
    '(min-width:800px)'
  ]).subscribe((res:BreakpointState)=>{
    if(res.matches){
   this.isMenuShow = true
   this.displayMenue  = false
   this.isMenueActive = true
    }
    else{
      // this.displayMenue  = false
      this.isMenuShow = false
    }
  })
      this.carRentService.userData$.subscribe(user => {
      if (user) {
        this.profileImage = user.profileImageUrl;
      }
    });

}

toggleMenu(){
  this.isMenueActive = !this.isMenueActive;
  this.displayMenue  =  !this.displayMenue
}
showProfileDropdown(){
  this.isProfileDisplay = true
  console.log('this profile')
}
logOut(){
  this.userRegisterService.logOut();
}
goToUserProfile(){
  const hasProfile = localStorage.getItem('hasProfile');
if(hasProfile){

  this.router.navigate(['/profile-detail'])
      this.isProfileDisplay = false
}
}
goToFavourite(){
  this.router.navigate(['/favourite'])
  this.isProfileDisplay = false
}
goToHistory(){
  this.router.navigate(['/userHistory'])
  this.isProfileDisplay = false
}

onHandleChange(){
this.isProfileDisplay = false
  console.log('this profile')
}
}
