import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiServicatService {

  //!change localURL for apiURL in all methods when API deployed
  localURL='http://127.0.0.1:5000/api/';

  currentUser : any = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json; charset=UTF-8'
    })
  }

  constructor(private http:HttpClient) { }

  //TODO 'T' es Generico

  getRows<T>(modelPath: string): Observable<T>{
    return this.http.get<T>(`${this.localURL}${modelPath}`, )
    .pipe(retry(1), catchError(this.errorHandler));
  }

  getRow<T>(id:number, modelPath: string): Observable<T>{
    return this.http.get<T>(`${this.localURL}${modelPath}/${id}`, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteRow<T>(id:number, modelPath: string): Observable<T>{
    return this.http.delete<T>(`${this.localURL}${modelPath}/${id}`, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  insertRow<T>(jsonData, modelPath: string): Observable<T>{
    return this.http.post<T>(`${this.localURL}${modelPath}`, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateRow<T>(id: number, jsonData, modelPath: string): Observable<T>{
    return this.http.put<T>(`${this.localURL}${modelPath}/${id}`, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  logIn<T>(jsonData, modelPath: string): Observable<T>{
    return this.http.post<T>(`${this.localURL}${modelPath}`, jsonData, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandler));
  }

  logOut(){
    this.currentUser = null;
  }

  errorHandler(error){
    let errorMessage = '';

    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }
    else {
      errorMessage = `Error Code:${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  saveUser(jsonData){
    this.currentUser = jsonData;
  }

}
