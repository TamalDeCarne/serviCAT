import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { City } from '../../models/city';
import { Specialty } from '../../models/specialty';
import { State } from '../../models/state';
import { ApiServicatService } from '../../services/api-servicat.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { RequestView } from '../../models/request-view';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogged = false;
  requests: any = [];

  constructor(
    private api: ApiServicatService,
    private cookieSrv : CookieService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
    if(this.cookieSrv.check('firstCookie') == true){
      this.isLogged = true;
    }
  }

  loadRequests(){
    return this.api.getRows<RequestView>('view-requests').subscribe(
      (data: {}) => {
        this.requests = data;
        console.log(this.requests);
      });
  }
}
