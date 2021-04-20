import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from './models/category';
import { City } from './models/city';
import { Specialty } from './models/specialty';
import { State } from './models/state';
import { ApiServicatService } from './services/api-servicat.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { RequestView } from './models/request-view';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  isLogged = false;
  
  constructor(
    private cookieSrv : CookieService,
    private route : Router
  ) {}

  ngOnInit(): void {
    if(this.cookieSrv.check('firstCookie') == true){
      this.isLogged = true;
    }
  }

  logout(){
    this.cookieSrv.delete('firstCookie');
    this.isLogged = !this.isLogged;
    this.route.navigateByUrl('home');
  }
  
}
