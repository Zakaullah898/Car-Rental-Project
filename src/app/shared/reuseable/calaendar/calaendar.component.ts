import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'calandar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './calaendar.component.html',
  styleUrl: './calaendar.component.css'
})
export class CalaendarComponent {
  @Output() onContinue = new EventEmitter<any>()
  continue(){
     this.onContinue.emit()
  }
}
