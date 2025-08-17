import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit ,AfterViewChecked, DoCheck, ChangeDetectorRef,inject} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { rentCarCard } from '../../../core/models/class/class';
import { CarsCardComponent } from '../cars-card/cars-card.component';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { CarRentServService } from '../../../core/services/car-rent-serv.service';
import { Observable } from 'rxjs';
import { review } from '../../../core/models/class/review';
import { CarsDataServService } from '../../../core/services/cars-data-serv.service';
import { ReviewServService } from '../../../core/services/review-serv.service';
@Component({
  selector: 'app-car-info',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule,CarsCardComponent],
  templateUrl: './car-info.component.html',
  styleUrl: './car-info.component.css'
})
export class CarInfoComponent implements  OnInit,AfterViewChecked{
  arrowUp=faAngleUp;
arrowDown=faAngleDown;
isAngelUp!:boolean;
carData: any = {};
restImg : any [] =[
  './insightBl.png',
  './insightBl.png',
  './insightR.png',
  './insightBl.png',
  './insightR.png',
]
ratedStars : any [] = [
  './rated.png',
  './rated.png',
  './rated.png',
  './rated.png',
  './unRated.png',
]

carDataServ = inject(CarsDataServService)
reviewServ = inject(ReviewServService)
reviewContainer : review [] =[]

moreReview : review [] =[]
carsName : any[] =[]
topRate : any[] =[]
isShowAllCars!: boolean;
gettingHistory : any;
constructor(private carRentSrv :CarRentServService, private router : Router, private cdr :ChangeDetectorRef) {
  //   this.carRentSrv.carData.subscribe((res: any)=>{
    //     this.carData =res;
    // console.log(this.carData)
    //   })
  }
  
  ngOnInit(): void {
    this.getAllUserCars()
    
    // this.carData 
    this.carsName =this.carDataServ.carsName ;
    this.topRate = this.carDataServ.topRate;
    this.moreReview = this.reviewServ.moreReview
    this.reviewContainer= this.reviewServ.reviewContainer
  }
  
  ngAfterViewChecked(): void {
      this.carData = history.state
    //   this.carData = this.gettingHistory      
    // console.log(this.carData)
    if (history.state && history.state.data) {
        this.carData  = history.state.data;
      }
      this.cdr.detectChanges()
  }
goToRental(){
  
  this.router.navigate(['/rentNow'], {state:this.carData  })
}
  // receiveData(data: any){
  //  history = data
  //  this.carData = history
  //  console.log(data)
  // }
  receiveData(data: any) {
    // Store the data in history.state using pushState
    history.pushState({ data: data }, '', window.location.href);
    this.carData = data;
   // console.log(data);  Log for debugging
  }
getLikeImg(index : number ){
  debugger
  this.carsName[index].showLike = !this.carsName[index].showLike
  this.topRate[index].showLike = !this.carsName[index].showLike
 }
showAll(){
  this.isAngelUp =!this.isAngelUp
  if(this.isAngelUp){

    this.reviewContainer =this.reviewContainer.concat(this.moreReview)
  }
  else if(!this.isAngelUp){
    this.reviewContainer = this.reviewContainer.filter(review=> !this.moreReview.includes(review))
  }
}
getAllUserCars(){
  this.carRentSrv.getAllCars().subscribe((res:any)=>{
    
        this.carsName = res.data.slice(0,4)
        this.isShowAllCars=!this.isShowAllCars
        // console.log(this.carsName)
  })
}
viewAll(){
  this.carRentSrv.getAllCars().subscribe((res:any)=>{

    this.carsName = res.data
    console.log(this.carsName)
    this.isShowAllCars=!this.isShowAllCars
  })
}
}
