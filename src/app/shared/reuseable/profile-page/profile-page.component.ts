import { Component, inject, OnInit } from '@angular/core';
import { UserProfile } from '../../../core/Interface/user-profile';
import { CarRentServService } from '../../../core/services/car-rent-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
carRentService : CarRentServService = inject(CarRentServService);
router : Router = inject(Router);
user : UserProfile | null =null;

ngOnInit(): void {
        this.carRentService.userData$.subscribe(userData => {
      if (userData) {
        this.user = userData;
      }
    });
}
goToUpdateProfile()
{
  localStorage.setItem('updateProfile', JSON.stringify(true));
  this.router.navigate(['profile-form'] , {state: {userData: this.user}})
}
}
