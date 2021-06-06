import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Usuario } from '../modules/common/login/model/loginModel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  private currentTokenSubject:BehaviorSubject<any>;
  public currentToken:string;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentToken = localStorage.getItem('accessToken');
  }
  private usuario: Usuario;
  private loginUrl = "http://localhost:8080/examen/login"; // URL to web api
  
  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
}

  public getLogin(usuario:Usuario): Observable<Usuario> {
    const  headers = new  HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Usuario>(this.loginUrl,  JSON.stringify(usuario),{headers})
    .pipe(map(usuario => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(usuario));
        localStorage.setItem('accessToken',usuario.accessToken)
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
        return usuario;
    }));
  }

  
}
