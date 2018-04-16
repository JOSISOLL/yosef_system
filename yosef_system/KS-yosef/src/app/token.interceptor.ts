import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from "@angular/common/http";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const idToken = localStorage.getItem('id_token')
        // const idToken = '12313598123kjhasd1239'
        if(idToken){
        let _req = req.clone({
                headers: req.headers.set("Authorization",
                "Bearer " + idToken)
                
        } )
        // console.log("this is the " + idToken)
        return next.handle(_req)
    }
    else {
        return next.handle(req);
    }

    }
         
}