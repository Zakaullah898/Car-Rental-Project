import { AfterViewChecked, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faAngleLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DropdownOptionComponent } from '../../shared/reuseable/dropdown-option/dropdown-option.component';
import { CarsCardComponent } from '../../shared/reuseable/cars-card/cars-card.component';
import { CarInfoComponent } from '../../shared/reuseable/car-info/car-info.component';
import { BillingInfComponent } from '../../shared/reuseable/billing-inf/billing-inf.component';
import { RentalSummaryComponent } from '../../shared/reuseable/rental-summary/rental-summary.component';
import { RentalInfComponent } from '../../shared/reuseable/rental-inf/rental-inf.component';
import { PaymentMethodComponent } from '../../shared/reuseable/payment-method/payment-method.component';
import { ConformationMessagComponent } from '../../shared/reuseable/conformation-messag/conformation-messag.component';
import { rentCarCard } from '../../core/models/class/class';
import { CarRentServService } from '../../core/services/car-rent-serv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { carData } from '../../core/models/class/carData';
import { CarsDataServService } from '../../core/services/cars-data-serv.service';
@Component({
  selector: 'app-vehicle-listing',
  standalone: true,
  imports: [DropdownOptionComponent,FormsModule,MatSliderModule,CarsCardComponent,FontAwesomeModule,CarInfoComponent,BillingInfComponent,RentalSummaryComponent,RentalInfComponent,PaymentMethodComponent,ConformationMessagComponent,CommonModule],
  templateUrl: './vehicle-listing.component.html',
  styleUrl: './vehicle-listing.component.css'
})
export class VehicleListingComponent implements OnInit,AfterViewChecked{
  isCarInfo: boolean = false;
  isSideVehicleSecVisi : boolean =true;
  isMenuVisi!: boolean;
  carsCompany :any [] =['Volvo','Volkswagen', 'Toyota', 'Ford','Mercedes-Benz' , 'Kia' , 'Suzuky'];
  modelOfCars : any [] =[2000, 2001,2003,2004,2005,2006,2007,2008,2008, 2009, 2010,2011, 2012,]
minValue: number = 2500;
maxValue: number = 50000;
carsName : carData[] =[]
crossBar = faXmark;
angelRight= faAngleRight;
angelLeft = faAngleLeft;
menueBar=faBars;
currentRoute: string= 'vehicleListing'
carData: any = {};
carDataSer = inject(CarsDataServService)
constructor(private activateroute:ActivatedRoute,private router:Router,private carRentServ:CarRentServService , private breakpoints: BreakpointObserver,private cdr :ChangeDetectorRef){
  this.activateroute.data.subscribe((res : any)=>{
    this.currentRoute = res.currentRoute
  })
  
  }
ngOnInit(): void {
  this.carData =history.state
  this.getAllUserCars()
  console.log( this.carData)
  this.breakpoints.observe([
    '(max-width : 800px)'
  ]).subscribe((res: BreakpointState)=>{
    if(res.matches){
      this.isSideVehicleSecVisi =false
      this.isMenuVisi =true
    }
    else{
      this.isSideVehicleSecVisi = true
      this.isMenuVisi = false
    }
  })
  this.carsName = this.carDataSer.vehicalcarData
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
receiveData(data: any) {
  // Store the data in history.state using pushState
  history.pushState({ data: data }, '', window.location.href);
  this.carData = data;
}
getLikeImg(index : number ){
debugger
this.carsName[index].showLike = !this.carsName[index].showLike
}
getAllUserCars(){
  this.carRentServ.getAllCars().subscribe((res:any)=>{
    
        this.carsName = res.data
        console.log(this.carsName)
  })
}
hideSideBar(){
  this.isSideVehicleSecVisi = !this.isSideVehicleSecVisi 
}
}