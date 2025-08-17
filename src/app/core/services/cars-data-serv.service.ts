import { Injectable } from '@angular/core';
import { carData } from '../models/class/carData';

@Injectable({
  providedIn: 'root'
})
export class CarsDataServService {

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
  constructor() { }

}
