import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from 'src/app/models/category';
import { City } from 'src/app/models/city';
import { Specialty } from 'src/app/models/specialty';
import { State } from 'src/app/models/state';
import { Request } from 'src/app/models/request';
import { ApiServicatService } from 'src/app/services/api-servicat.service';

@Component({
  selector: 'app-request-update',
  templateUrl: './request-update.component.html',
  styleUrls: ['./request-update.component.css']
})
export class RequestUpdateComponent implements OnInit {
  
  requestForm: FormGroup;
  states: any = [];
  cities: any = [];
  categories: any = [];
  specialties: any = [];

  constructor(
    private api: ApiServicatService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<RequestUpdateComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.requestId = data.requestId;
  }

  requestId: number;

  requestData : Request;

  ngOnInit() {
    this.requestForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      specialty_id: ['', [Validators.required]],
      user_id: [''],
      body: ['', [Validators.required]]
    });
    this.loadStates();
    this.loadCategories();
    this.getRequest()
  }

  getRequest() {
    return this.api.getRow<Request>(this.requestId, 'request').subscribe(
      (data) => {
        this.requestData = data;
        this.loadCities(this.requestData.state_id);
        this.loadSpecialties(this.requestData.category_id);
        this.requestForm.patchValue({
          title: this.requestData.title,
          state_id: this.requestData.state_id,
          city_id: this.requestData.city_id,
          category_id: this.requestData.category_id,
          specialty_id: this.requestData.specialty_id,
          user_id: this.requestData.user_id,
          body: this.requestData.body
        });
      })
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

  updateRequest(){
    return this.api.updateRow<Request>(this.requestId, this.requestForm.value, 'request').subscribe(
      (data: {}) => {
        this.dialogRef.close(true);
      }
    );
  }
}
