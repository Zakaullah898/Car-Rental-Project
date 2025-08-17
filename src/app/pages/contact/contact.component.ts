import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customValidator } from '../../core/validators/allowedSpace.validator';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FontAwesomeModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
mibilIcon = faMobileAlt;
payPalIcon = faPaypal;
LocatIcon = faLocationDot;
envelopIcon = faEnvelopeOpen;
//This is formgroup for contact form
contactForm :FormGroup = new FormGroup({
  firstName: new FormControl('',[Validators.required,customValidator.noSpaceAlowed]),
  lastName: new FormControl('',[Validators.required,customValidator.noSpaceAlowed]),
  email: new FormControl('',[Validators.required,Validators.email]),
  phoneNumber: new FormControl(),
  message : new FormControl(),
})
onSubmit(){
  console.log(this.contactForm)
}
}
