import { Component, Input } from '@angular/core';
import { CarRentServService } from '../../../core/services/car-rent-serv.service';

@Component({
  selector: 'app-rental-summary',
  standalone: true,
  imports: [],
  templateUrl: './rental-summary.component.html',
  styleUrl: './rental-summary.component.css'
})
export class RentalSummaryComponent {
  ratedStars : any [] = [
    './rated.png',
    './rated.png',
    './rated.png',
    './rated.png',
    './unRated.png',
  ]
  @Input() carName!:any;
  @Input() rentPrice!:any;
  
}
