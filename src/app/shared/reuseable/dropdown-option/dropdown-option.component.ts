import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dropdown-option',
  standalone: true,
  imports: [FontAwesomeModule,FormsModule],
  templateUrl: './dropdown-option.component.html',
  styleUrl: './dropdown-option.component.css'
})
export class DropdownOptionComponent {
  isDrop?:boolean;
  arrowUp=faAngleUp;
  arrowDown=faAngleDown;
  @Input() selectedValue: string =''
@Input()selectedOpt :string ='Select All'
@Input()myClass :string =''
@Input() list ?:any;
dropdownShow(){
  this.isDrop = !this.isDrop;
}
}
