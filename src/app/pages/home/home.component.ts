import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CarsCardComponent } from '../../shared/reuseable/cars-card/cars-card.component';
import { CarRentServService } from '../../core/services/car-rent-serv.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { carData } from '../../core/models/class/carData';
import { CarsDataServService } from '../../core/services/cars-data-serv.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalaendarComponent } from '../../shared/reuseable/calaendar/calaendar.component';
import { Car } from '../../core/Interface/car';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarsCardComponent,ReactiveFormsModule,CalaendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userId !: string;
  isShowAllCars!:boolean;
  isBanrRentBtnVisible!:boolean;
  isDisplay : boolean =false;
  router = inject(Router)
  carsData : Car[] =[]
  servExpCont : any [] =[]
  carsDeleted : any;
  subcriptionForm : FormGroup = new FormGroup({
    email : new FormControl('')
  })
  carDataServ = inject (CarsDataServService);
  carRentService : CarRentServService = inject(CarRentServService);
  loader = inject(NgxUiLoaderService)
  constructor(private breakpointObserver: BreakpointObserver){
    // this.getAllUserCars()
  }
 
  ngOnInit(): void {
    // this.getAllUserCars()
    this.breakpointObserver.observe([
      '(min-width:800px)'
    ]).subscribe((res:BreakpointState)=>{
      if(res.matches){
       this.isBanrRentBtnVisible = true
      }
      else{
        this.isBanrRentBtnVisible = false
      }
    })
    // this.carsData =this.carDataServ.
    this.servExpCont = this.carDataServ.servExpCont
    this.getAllCarsData()
    // getting user id that I'll user for adding car to favourite 
        this.carRentService.userData$.subscribe(user => {
      if (user) {
        this.userId = user.userId;
      }
    }); 
  }

  // method for subscription submit 
  onSubmit(){
    console.log(this.subcriptionForm.value
    )
    console.log(
      this.subcriptionForm.controls['email'].value
    )
    if(this.subcriptionForm.controls['email'].value){
      this.isDisplay = true
      // let modal = document.getElementById('showModal')
      //     modal!.innerHTML = `<div class="showCalander"></div>`
    }
    this.subcriptionForm.reset()
  }
  isContinue(){
    this.isDisplay = !this.isDisplay
  }
  // method for like 
      getLikeImg(index : number ){
        this.carsData[index].isFavorite = !this.carsData[index].isFavorite
    }
    goToRental(){
      this.router.navigateByUrl('rentNow')
    }
    getAllCarsData(){
      this.carDataServ.getAllCarsData().subscribe((res:any)=>{
        
            this.carsData = res.data.slice(0,4)
            this.isShowAllCars=!this.isShowAllCars
            this.loader.stop()
            console.log("Cars Data",this.carsData)
      })
        }
        viewAll(){
          this.carDataServ.getAllCarsData().subscribe((res:any)=>{
        
            this.carsData = res.data
            this.isShowAllCars=!this.isShowAllCars
            console.log(this.carsData)
          })
        }
}
