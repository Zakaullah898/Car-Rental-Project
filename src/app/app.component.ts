import { Component ,OnInit } from '@angular/core';
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

import {ActivatedRoute,RouterOutlet } from '@angular/router';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule, RouterOutlet,NavBarComponent,FooterComponent,SignInComponent,CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Car Rental';

  showHeader: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
     this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Start from the root activated route
    let currentRoute:any = this.router.routerState.root
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild
    }
    this.showHeader = currentRoute.snapshot.data.header
    console.log(this.showHeader);

    });

    
  }

  ngOnInit(): void {
   
  }
}
