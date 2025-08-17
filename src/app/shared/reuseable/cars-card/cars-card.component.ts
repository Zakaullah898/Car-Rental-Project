import { Component,  EventEmitter, inject, Input, Output ,OnInit} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { CarRentServService } from '../../../core/services/car-rent-serv.service';
import { rentCarCard } from '../../../core/models/class/class';
import { CommonModule } from '@angular/common';
import { state } from '@angular/animations';

@Component({
  selector: 'app-cars-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cars-card.component.html',
  styleUrl: './cars-card.component.css'
})
export class CarsCardComponent implements OnInit{
isCarCarVisible: boolean=true;
isCarInfo?: boolean;

@Input() carName!: any;
@Input() carImg!: any;
@Input() dataArry:any = [];

@Input() pkr!: any;
@Input() tankCapacity!: any;
@Input() transmission!: any;
@Input() sittingCapacity!: any;
@Input() isVisible ?: boolean ;
@Input() carDataGetted : any ={}; //= { carNam: this.carName, carImg:this.carImg,pkr:this.pkr,isVisible: false}
@Output() onBtnClick = new EventEmitter<any>()
@Output() onRentalPagLOad = new EventEmitter<any>()
@Output() carDataload = new EventEmitter<any>()
router = inject(Router)
carRenSrv = inject(CarRentServService);
 
constructor(){

}
ngOnInit(): void {
  
  // this.carDataGetted = { carNam: this.carName, carImg:this.carImg,pkr:this.pkr,isVisible: true}
  this.carName
  this.pkr
}

getImg(){
 
this.onBtnClick.emit()
}
goToRental(){
  
  this.router.navigate(['/rentNow'], {state:{name: this.carName, rentPrice :this.pkr}})
}
carsDetailPage(){
  this.router.navigate(['/carInfo'], {state: this.carDataGetted})
  this.carDataload.emit(this.carDataGetted)
  console.log(this.carDataGetted)
  
}

}
