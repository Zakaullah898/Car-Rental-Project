import { inject, Injectable } from '@angular/core';
import { carData } from '../models/class/carData';
import { HttpClient } from '@angular/common/http';
import { carRentApiConst } from '../constant/carRentConstant';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsDataServService {
http : HttpClient = inject(HttpClient);
private sourceData = new BehaviorSubject<boolean>(false);
isRemoved$ = this.sourceData.asObservable();


  carsName : carData[] =[
    {name:'Swift', rentPrice :'4000', image:'./swift.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
    {name:'Wagon-R', rentPrice :'5000', image:'./wagonR.png', showLike : false , tankCapacity: 54, transmission : 4, sittingCapacity : 2},
    {name:'Rolls - Royce', rentPrice :'4500', image:'./rolls.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
    {name:'Nissan GT - R', rentPrice :'3500', image:'./nissan.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  ]

  servExpCont : any [] =[
    {servImg:'./booking.png',servExpHeadibg:'Book with flexibility', servExpDescrip : 'Easily find car and book   with no change fees.'},
    {servImg:'./setting.png',servExpHeadibg:'Trusted and free', servExpDescrip : 'We’re completely free to use – no hidden charges or fees..'},
    {servImg:'./prof.png',servExpHeadibg:'We know travel', servExpDescrip:"With 10 years of experience, we're ready to help find your perfect car"}
  ]
  carsNameComp : carData[] =[
    {name:'Swift', rentPrice :'4000', image:'./swift.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
    {name:'Wagon-R', rentPrice :'5000', image:'./wagonR.png', showLike : false , tankCapacity: 54, transmission : 4, sittingCapacity : 2},
    {name:'Rolls - Royce', rentPrice :'4500', image:'./rolls.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
    {name:'Nissan GT - R', rentPrice :'3500', image:'./nissan.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  ]
  topRate : carData[] =[
    {name:'Swift', rentPrice :'4000', image:'./swift.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  
      {name:'Wagon-R', rentPrice :'5000', image:'./wagonR.png', showLike : false , tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  
      {name:'Rolls - Royce', rentPrice :'4500', image:'./rolls.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  
      {name:'Nissan GT - R', rentPrice :'3500', image:'./nissan.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  ]
  vehicalcarData : carData[] = [
    {name:'Swift', rentPrice :'4000', image:'./swift.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  
    {name:'Wagon-R', rentPrice :'5000', image:'./wagonR.png', showLike : false , tankCapacity: 54, transmission : 4, sittingCapacity : 2},

    {name:'Rolls - Royce', rentPrice :'4500', image:'./rolls.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},

    {name:'Nissan GT - R', rentPrice :'3500', image:'./nissan.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
    {name:'Keon', rentPrice :'4000', image:'./keon.png', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  
      {name:'Ferrari', rentPrice :'5000', image:'./ferrari.jpg', showLike : false , tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  
      {name:'cultus', rentPrice :'4500', image:'./cultus.jpg', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  
      {name:'APV', rentPrice :'3500', image:'./apv.jpg', showLike : false, tankCapacity: 54, transmission : 4, sittingCapacity : 2},
  ]
  constructor() { 
    
  }

  reloadingFavouritePage(value : boolean){
    this.sourceData.next(value)
  }
  getAllCarsData(){
    return this.http.get(`${carRentApiConst.API_URL}${carRentApiConst.GET_ALL_CARS}`)
  }
  // Getting Favourite cars data
  gettingFavouriteCars(userId : string){
    return this.http.get(`${carRentApiConst.API_URL}${carRentApiConst.FAVOURITE_CARS}/${userId}`)
  }

  addingToFavourite(carId: number, userId: string) {
  const payload = {
    favoriteId: 0,
    userId: userId,
    carId: carId,
    addedAt: new Date().toISOString()
  };
  return this.http.post(`${carRentApiConst.API_URL}${carRentApiConst.ADD_TO_FAVOURITE}`, payload);
}
// api endpoint calling for deleting car from the favourite 
deleteCarFromFavourite(userId : string, carId : number){
  return this.http.delete(`${carRentApiConst.API_URL}${carRentApiConst.REMOVE_FROM_FAVOURITE}/${userId}/${carId}`)
}
}
