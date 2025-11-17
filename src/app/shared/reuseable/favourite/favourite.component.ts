import { Component, inject, OnInit } from '@angular/core';
import { CarsCardComponent } from '../cars-card/cars-card.component';
import { CarsDataServService } from '../../../core/services/cars-data-serv.service';
import { Car } from '../../../core/Interface/car';
import { CarRentServService } from '../../../core/services/car-rent-serv.service';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [CarsCardComponent],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent implements OnInit{
  carDataService : CarsDataServService = inject(CarsDataServService);
  carRentService : CarRentServService = inject(CarRentServService);
  userId !: string;
  FavouriteCars : Car[] =[
  ]
  ngOnInit(): void {
    this.carRentService.userData$.subscribe(user => {
      if (user) {
        this.userId = user.userId;
      }
    }); 
    console.log("in the favourite component userId : ",this.userId)
    this.gettingFavouriteCars(this.userId);
  }
  getLikeImg(index : number ){
    // this.carsName[index].showLike = !this.carsName[index].showLike
   }
   gettingFavouriteCars(userId : string){
    this.carDataService.gettingFavouriteCars(userId).subscribe((res: any)=>{
      console.log("in the favourite component: ",res.data)
      this.FavouriteCars = res.data;
    })
   }
}
