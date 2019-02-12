import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  constructor(private _toast : ToastrService, private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  public get authenticated(): boolean{
    return this._auth.loggedIn();
  }
  logout(){
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this._toast.success("Logout Successful", "Logout")
    this._router.navigate(['/'])
  }
}
