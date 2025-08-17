import { Component } from '@angular/core';
import { CarsCardComponent } from '../cars-card/cars-card.component';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [CarsCardComponent],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent {
  carsName : any[] =[
    {carName:'Swift', pkr :'4000', carImg:'./swift.png', showLike : false},
    {carName:'Wagon-R', pkr :'5000', carImg:'./wagonR.png', showLike : false },
    {carName:'Rolls - Royce', pkr :'4500', carImg:'./nissan.png', showLike : false},
  ]
  getLikeImg(index : number ){
    this.carsName[index].showLike = !this.carsName[index].showLike
   }
}
