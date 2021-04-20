import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiServicatService } from 'src/app/services/api-servicat.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  hide = true;
  registerForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private api: ApiServicatService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  showPassword(){
    this.hide = !this.hide;
  }

  registerUser(){
    if(this.registerForm.valid){
      this.api.insertRow<User>(this.registerForm.value,'user').subscribe(
        (data: {}) => {
          this.router.navigateByUrl('login');
        }
      )
    }
  }

}
