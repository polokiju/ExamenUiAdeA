import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginServicesService } from 'src/app/services/login-services.service';

//import { AuthenticationService } from '@/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginServices: LoginServicesService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.loginServices.currentUserValue;
        if (currentUser && currentUser.getToken()) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.getToken()}`
                }
            });
        }

        return next.handle(request);
    }
}