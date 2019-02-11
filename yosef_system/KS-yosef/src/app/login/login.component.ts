import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from "moment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}

  constructor(private _auth: AuthService,
    private _router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }
  loginUser(){
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res)
        const expiresAt = moment().add(res.expiresIn, 'second')

        localStorage.setItem('id_token', res.idToken)
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
        this.toastr.success('Success', "Logged In Successfully");
        this._router.navigate(['/dashboard'])
			
        
      },
      err => {
        console.log(err)
        this.toastr.error('Failed', "Invalid Credentials");
      }

    )
  }
  

  // logout(){
  //   localStorage.removeItem('id_token')
  //   localStorage.removeItem('expires_at')
  // }

  // public isLoggedIn(){
  //   return moment().isBefore(this.getExpiration())
  // }
  // isLoggedOut(){
  //   return !this.isLoggedIn()
  // }
  // getExpiration(){
  //   const expiration = localStorage.getItem('expires_at')
  //   const expiresAt = JSON.parse(expiration)
  //   return moment(expiresAt)
  // }

}
