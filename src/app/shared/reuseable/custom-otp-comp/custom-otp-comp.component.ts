import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, } from '@angular/forms';
import {NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-custom-otp-comp',
  standalone: true,
  imports: [FormsModule,NgOtpInputModule,],
  templateUrl: './custom-otp-comp.component.html',
  styleUrl: './custom-otp-comp.component.css',
 
})
export class CustomOtpCompComponent {

  config = {
    length: 5,
    inputClass: 'custom-otp-input',
  }

}
