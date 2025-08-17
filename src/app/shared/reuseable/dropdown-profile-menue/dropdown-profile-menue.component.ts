import { Component, EventEmitter, Input, Output ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHeart, faClipboard, faShare } from '@fortawesome/free-solid-svg-icons';
import { CommonModule,  } from '@angular/common';
import { ClickOutsideDirective } from '../../../core/customDirective/click-outside.directive';
@Component({
  selector: 'profile-menue',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule,ClickOutsideDirective],
  templateUrl: './dropdown-profile-menue.component.html',
  styleUrl: './dropdown-profile-menue.component.css'
})
export class DropdownProfileMenueComponent {
  faUser = faUser;
  faHeart = faHeart;
  faClipboard = faClipboard;
  faShare = faShare;
  @Input() containerProfile : string = ''
  @Output() logout = new EventEmitter<any>()
  @Output() goToUserProfile = new EventEmitter<any>()
  @Output() goToFavourite = new EventEmitter<any>()
  @Output() goToHistory = new EventEmitter<any>()
  router : Router = inject(Router)
  onLogOut(){
    this.logout.emit()
  }
  userProfile(){
    this.goToUserProfile.emit()
   
  }
favourite(){
  this.goToFavourite.emit()
}
history(){
  this.goToHistory.emit()
}
}
