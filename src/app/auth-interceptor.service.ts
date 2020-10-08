import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      //  const modifedReq= req.clone({url: "....", headers: req.headers.append('A', 'gfff')})  
        const modifedReq= req.clone({
            headers: req.headers.append('A', 'gfff')
        })  
        return next.handle(modifedReq)
    }
}