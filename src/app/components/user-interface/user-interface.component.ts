import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Category } from 'src/app/models/category';
import { City } from 'src/app/models/city';
import { RequestView } from 'src/app/models/request-view';
import { Specialty } from 'src/app/models/specialty';
import { State } from 'src/app/models/state';
import { User } from 'src/app/models/user';
import { ApiServicatService } from 'src/app/services/api-servicat.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RequestUpdateComponent } from '../request-update/request-update.component';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  requestForm: FormGroup;
  requestList: any = [];
  states: any = [];
  cities: any = [];
  categories: any = [];
  specialties: any = [];

  displayedColumns : string[] = ['title', 'category', 'specialty', 'acciones'];
  dataSource;
  constructor(
    private api: ApiServicatService,
    private _formBuilder: FormBuilder,
    private cookieSrv: CookieService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.requestForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      specialty_id: ['', [Validators.required]],
      user_id: [''],
      body: ['', [Validators.required]]
    })
    this.loadStates();
    this.loadCategories();
    this.loadRequests();
    if(this.cookieSrv.check('firstCookie') == false){
      this.router.navigateByUrl('login');
    }
  }

  loadRequests(){
    return this.api.getRows<Request>('requests').subscribe(
      (data: {}) => {
        this.requestList = data;
        this.requestList = this.requestList.filter((request) => request.user_id === Number(this.cookieSrv.get('firstCookie')));
        this.dataSource = new MatTableDataSource<Request>(this.requestList);
        console.log(this.requestList.city_id);
      });
  }

  loadStates(){
    return this.api.getRows<State>('states').subscribe(
      (data: {}) => {
        this.states = data;
      }
    )
  }

  loadCities(state){
    return this.api.getRows<City>('cities').subscribe(
      (data: {}) => {
        this.cities = data;
        this.cities = this.cities.filter((city) => city.state_id === state);
      }
    )
  }

  loadCategories(){
    return this.api.getRows<Category>('categories').subscribe(
      (data: {}) => {
        this.categories = data;
      }
    )
  }

  loadSpecialties(category){
    return this.api.getRows<Specialty>('specialties').subscribe(
      (data: {}) => {
        this.specialties = data;
        this.specialties = this.specialties.filter((specialty) => specialty.category_id === category);
      }
    )
  }


  insertRequest(){
    if(this.requestForm.valid){
      this.requestForm.patchValue({
          user_id: this.cookieSrv.get('firstCookie')
        })
      this.api.insertRow<Request>(this.requestForm.value, 'request').subscribe(
        (data: {}) => {
          this.loadRequests();
          this.requestForm.reset();
        }
      )
    }
    console.log(this.requestForm.value);
  }

  updateRequest(request) {
    const dialogRef1 = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de actualizar esta petición',
        message: '¿Estas seguro?'
      }
    });
    dialogRef1.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        const dialogconfig = new MatDialogConfig();
        dialogconfig.data = {
          requestId: request.id,
        };
        const updatedialog = this.dialog.open(RequestUpdateComponent, dialogconfig);
        updatedialog.afterClosed().subscribe(dialogRef => {
          if(dialogRef){
            this.loadRequests();
          }
        });
      }
    });
  }

  deleteRequest(request){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de borrar esta petición',
        message: '¿Estas seguro?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult){
        return this.api.deleteRow<Request>(request.id, 'request').subscribe((data) => {
          this.loadRequests();
        });
      }
    })
  }
}


