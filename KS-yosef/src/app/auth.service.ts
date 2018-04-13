import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from "moment";


@Injectable() 
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  constructor(private http: HttpClient, 
    private _router: Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl, user)
  }
  loginUser(user){
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn(){
    return !!localStorage.getItem('id_token')
  }
  logout(){
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this._router.navigate(['/'])
  }

  public isLoggedIn(){
    return moment().isBefore(this.getExpiration())
  }
  isLoggedOut(){
    return !this.isLoggedIn()
  }
  getExpiration(){
    const expiration = localStorage.getItem('expires_at')
    const expiresAt = JSON.parse(expiration)
    return moment(expiresAt)
    
  }

}
