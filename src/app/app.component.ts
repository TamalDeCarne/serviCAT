import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'servicat-project';
  requests: any = [
    {title: 'test', body: 'esta es una prueba'},
    {title: 'test', body: 'esta es una prueba'},
    {title: 'test', body: 'esta es una prueba'}
  ];

}
