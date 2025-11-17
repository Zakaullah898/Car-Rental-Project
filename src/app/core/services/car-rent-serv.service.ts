import { inject, Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, Subject,  } from 'rxjs';
import {  rentCarCard } from '../models/class/class';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { carRentApiConst } from '../constant/carRentConstant';

@Injectable({
  providedIn: 'root'
})
export class CarRentServService {
public carData : Subject<rentCarCard> = new Subject<rentCarCard>;
private userDataSource = new BehaviorSubject<any>(null);
userData$ = this.userDataSource.asObservable();

http = inject(HttpClient);
  constructor() { 
    const storedUser = localStorage.getItem('superUser');
    if (storedUser) {
      this.userDataSource.next(JSON.parse(storedUser));
    }
  }

  setUserData(data: any) {
    this.userDataSource.next(data);
    localStorage.setItem('superUser', JSON.stringify(data));
  }

  
  

}
