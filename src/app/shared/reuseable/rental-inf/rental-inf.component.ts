import { Component } from '@angular/core';
import { DropdownOptionComponent } from '../dropdown-option/dropdown-option.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { DatePipe } from '@angular/common';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { CalaendarComponent } from '../calaendar/calaendar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-rental-inf',
  standalone: true,
  imports: [DropdownOptionComponent,NgxMaterialTimepickerModule,DatePipe,CalaendarComponent,FontAwesomeModule],
  templateUrl: './rental-inf.component.html',
  styleUrl: './rental-inf.component.css'
})
export class RentalInfComponent {
  isTimeShow?: boolean ;
  timeIs: any ;
 calanderIcon = faCalendarPlus;

  showTime(){
    this.isTimeShow = !this.isTimeShow
    if(this.isTimeShow){
      this.timeIs = new Date() 
    }
  }
}
