import { Component,  EventEmitter, inject, Input, Output ,OnInit} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { CarRentServService } from '../../../core/services/car-rent-serv.service';
import { rentCarCard } from '../../../core/models/class/class';
import { CommonModule } from '@angular/common';
import { state } from '@angular/animations';
import { CarsDataServService } from '../../../core/services/cars-data-serv.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
import { Car } from '../../../core/Interface/car';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cars-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cars-card.component.html',
  styleUrl: './cars-card.component.css'
})
export class CarsCardComponent implements OnInit{
  userId! :string;
  isCarCarVisible: boolean=true;
  isCarInfo?: boolean;
  @Input() carId! : number;
  @Input() carName!: any;
  @Input() dataArry:any = [];
  @Input() carImg!: any;
  @Input() tankCapacity!: any;
  @Input() pkr!: any;
  @Input() sittingCapacity!: any;
  @Input() transmission!: any;
  @Input() carDataGetted : any ={}; 
  @Output() onBtnClick = new EventEmitter<any>()
  @Output() onRentalPagLOad = new EventEmitter<any>()
  @Output() carDataload = new EventEmitter<any>()
  @Input() isFavouritePage: boolean = false; // default false
  @Input() isVisible: boolean = false;      // current favourite state

  router = inject(Router)
  carDataService : CarsDataServService  = inject(CarsDataServService);
  carRentService : CarRentServService = inject(CarRentServService);
  loader = inject(NgxUiLoaderService)
 
constructor(){

}
ngOnInit(): void {
  
  // this.carDataGetted = { carNam: this.carName, carImg:this.carImg,pkr:this.pkr,isVisible: true}
  this.carName
  this.pkr
      this.carRentService.userData$.subscribe(user => {
      if (user) {
        this.userId = user.userId;
      }
    }); 
}

addToFavouritCar(){
    if (this.isFavouritePage && this.isVisible) {
      Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to remove this from your favourites?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, remove it',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      this.callDeleteAPI(this.userId,this.carId);
    }
  });
    return;
  }
  this.carDataService.addingToFavourite(this.carId,this.userId).subscribe({
    next: (res : any) =>{ 
      if(res.status){
        Swal.fire({
          icon: "success",
          title: res.message,
          timer: 1500,
          showConfirmButton: false
        });
        this.isVisible = !this.isVisible;
      }
      if (res.statusCode === 409) {
          Swal.fire({
            icon: 'info',
            title: 'Already Added',
            text: 'This car is already in your favourites.',
            timer: 1500,
            showConfirmButton: false
          });
          this.isVisible = false;
        } 
      console.log('Car added to favourites', res)
    },
    error: err => console.error('Failed to add favourite', err)
  });
}
goToRental(){
  
  this.router.navigate(['/rentNow'], {state:{name: this.carName, rentPrice :this.pkr}})
}
carsDetailPage(carId : number){
  
  // this.carDataService.gettingCarData(this.carDataGetted)
  // this.carDataService.gettingCarById(carId).subscribe((res :any)=>{
  //   const car : Car = res.data;
  //   console.log(res.data)
  // })
    this.carDataService.setCarData(this.carDataGetted)
  this.router.navigate(['/carInfo',carId])
  // this.carDataload.emit(this.carDataGetted)
  
}
// api endpoint for deleting car from favourite 
callDeleteAPI(userId : string, carId : number){
  // this.loader.start();
  this.carDataService.deleteCarFromFavourite(userId,carId).subscribe({
    next:(res : any)=>{
      let result = Swal.fire({
        title: 'Removed!',
        text: 'Car has been removed from your favourites.',
        icon: 'success',
        timer: 1500, // Auto close after 1.5 seconds
        showConfirmButton: false // Optional: hide the confirm button for auto-close
        }).then((result) => {
          // Since the alert auto-closes, `isConfirmed` might not trigger, 
          // so you can call your method directly if needed after timer
          this.carDataService.reloadingFavouritePage(true);
        });
        // this.loader.stop();
      },
      error: err => console.error('Failed to delete favourite', err)
    })
}
}
