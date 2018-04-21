import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from "@angular/common/http";
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    

    constructor(private injector: Injector){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        
        let _authService = this.injector.get(AuthService)
        
        const idToken = _authService.getToken()

        if(_authService.getToken()){
        let _req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${_authService.getToken()}`
                }
                
        } )
        return next.handle(_req)
    }
    else {
        return next.handle(req);
    }

    }
         
}