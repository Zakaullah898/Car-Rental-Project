import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CarsCardComponent } from '../../shared/reuseable/cars-card/cars-card.component';
import { CarRentServService } from '../../core/services/car-rent-serv.service';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { carData } from '../../core/models/class/carData';
import { CarsDataServService } from '../../core/services/cars-data-serv.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalaendarComponent } from '../../shared/reuseable/calaendar/calaendar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarsCardComponent,ReactiveFormsModule,CalaendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
isShowAllCars!:boolean;
isBanrRentBtnVisible!:boolean;
isDisplay : boolean =false;
//  updateLikeImages =this.showLike? './heart.png' : './Like.png'
router = inject(Router)
  carsName : carData[] =[]
  servExpCont : any [] =[]
  carsDeleted : any;
  subcriptionForm : FormGroup = new FormGroup({
    email : new FormControl('')
  })
  carDataServ = inject (CarsDataServService)
  constructor(private carRentServ:CarRentServService,private breakpointObserver: BreakpointObserver){
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
    this.carsName =this.carDataServ.carsName
    this.servExpCont = this.carDataServ.servExpCont
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
        this.carsName[index].showLike = !this.carsName[index].showLike
    }
    goToRental(){
      this.router.navigateByUrl('rentNow')
    }
    getAllUserCars(){
      this.carRentServ.getAllCars().subscribe((res:any)=>{
        
            this.carsName = res.data.slice(0,4)
            this.isShowAllCars=!this.isShowAllCars
            console.log(this.carsName)
      })
        }
        viewAll(){
          this.carRentServ.getAllCars().subscribe((res:any)=>{
        
            this.carsName = res.data
            this.isShowAllCars=!this.isShowAllCars
            console.log(this.carsName)
          })
        }
}
