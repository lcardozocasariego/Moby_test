import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Iauth } from '../interfaces/auth.interface';
import { IuserLogin } from '../interfaces/login.interface';
import { IuserRegister } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'https://luciano-cardozo-endpoint.herokuapp.com/users';
  userLogued: Iauth | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  hasSessionActive(): Observable<boolean> {
    const userID = localStorage.getItem('userID');

    if (!userID) return of(false);

    return this.http.get<Iauth>(`${this.baseURL}/${userID}`).pipe(
      map((user) => {
        this.userLogued = user;
        return true;
      })
    );
  }

  public get getUserLogued(): Iauth | undefined {
    return this.userLogued;
  }

  login(data: IuserLogin) {
    return this.http.get<Iauth[]>(`${this.baseURL}?email=${data.email}`).pipe(
      map((user) => {
        if (this.isValidLogin(user, data.password)) {
          this.userLogued = user[0];
          localStorage.setItem('userID', user[0].id.toString());
          this.router.navigate(["/posts"])
          return true;
        }
        return false;
      }),
      catchError((err) => {
        return throwError('Something went wrong');
      })
    );
  }

  isValidLogin(user: Iauth[], pass: string): boolean {
    if (user.length === 0) return false;
    if (user[0].password != pass) return false;

    return true;
  }

  register(data: IuserRegister) {
    return this.http.get<Iauth[]>(`${this.baseURL}?email=${data.email}`).pipe(
      map((user) => {
        if (user.length === 0) {
          this.registerUser(data).subscribe();
          this.router.navigate(["/posts"])
          return true;
        } else {
          return false;
        }
      }),
      catchError((err) => {
        return throwError('Something went wrong');
      })
    );
  }

  registerUser(data: IuserRegister) {
    return this.http.post<Iauth>(`${this.baseURL}`, data).pipe(
      tap(user => {
          console.log(user)
          this.userLogued = user;
          localStorage.setItem('userID', user.id.toString());
      }),
      catchError((err) => {
        return throwError('Something went wrong');
      })
    );
  }


  logOut(){
    localStorage.removeItem("userID")
    this.userLogued = undefined
    this.router.navigate(["/auth/login"])
  }
}