import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = AuthService.accessToken;
        const modifiedReq = req.clone({ 
          headers: req.headers.set('Authorization', `Bearer ${userToken}`),
        });
        return next.handle(modifiedReq);
    }

}