import { Injectable } from '@angular/core';
import { review } from '../models/class/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewServService {

  constructor() { }
  reviewContainer : review [] =[
    {profilImg:'./riya.png',userName: 'Riya',aboutWork: 'CEO At Shopify', date:'21 Jan 2024',discription:'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.'},
    {profilImg:'./rohan.png',userName: 'Rohan',aboutWork: 'CEO At Amazon', date:'21 Jul 2024',discription:'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.'}
  ]
  moreReview : review [] =[
    {profilImg:'./raju.png',userName: 'Raju',aboutWork: 'Colleg Boy', date:'21 Feb 2024',discription:'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.'},
    {profilImg:'./ellen.png',userName: 'Ellen',aboutWork: 'Student', date:'24 Aug 2023',discription:'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.'},
    {profilImg:'./piya.png',userName: 'Piya',aboutWork: 'Softwarr Eng', date:'24 Jul 2023',discription:'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.'},
  ]
}
