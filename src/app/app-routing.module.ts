import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestsComponent } from './components/requests/requests.component';
import { UserInterfaceComponent } from './components/user-interface/user-interface.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent},
    {path: 'user', component: UserInterfaceComponent},
    {path: 'login', component: LogInComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'requests', component: RequestsComponent},]

    @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
      })
      export class AppRoutingModule { }