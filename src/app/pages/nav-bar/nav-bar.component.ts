import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'; // Import the Xmark icon
import { DropdownProfileMenueComponent } from '../../shared/reuseable/dropdown-profile-menue/dropdown-profile-menue.component';
import { ClickOutsideDirective } from '../../core/customDirective/click-outside.directive';
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
  let localStore = localStorage.removeItem('userEmail');
  this.router.navigate(['/signIn'])
}
goToUserProfile(){
  this.router.navigate(['/profile'])
  this.isProfileDisplay = false
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
