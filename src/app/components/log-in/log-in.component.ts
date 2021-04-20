import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/user';
import { ApiServicatService } from 'src/app/services/api-servicat.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loggedUser : User;
  hide = true;
  loginForm: FormGroup;
  validation: any = [];

  constructor(
    private _formBuilder: FormBuilder,
    private api: ApiServicatService,
    private router: Router,
    private cookieSrv: CookieService,
    private appcomp : AppComponent) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  showPassword(){
    this.hide = !this.hide;
  }

  logIn() {
    return this.api.logIn<User>(this.loginForm.value, 'login').subscribe(
      (data: {}) =>{
        this.validation = data;
        if(this.validation.validCredentials == true){
          this.api.saveUser(data);
          console.log(this.api.currentUser);
          this.router.navigateByUrl('user');
          this.cookieSrv.set('firstCookie', JSON.stringify(this.api.currentUser.user_id), {expires: 1, sameSite: 'Lax'});
          this.appcomp.isLogged = true;
        }
      }
    )
  }

}
