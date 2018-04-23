import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Yosef';
  constructor( private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  public get authenticated(): boolean{
    return this._auth.loggedIn();
  }
}
