import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationResponse } from '../../models/authentication-response';
import { JwtHelperService } from '@auth0/angular-jwt';


// The token originally came from the response of the login API.
// You saved it client-side (localStorage).
// The interceptor simply reads that saved token and adds it to each future request header.
export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const storedUser = localStorage.getItem('user')
    if(storedUser){
        const authResponse: AuthenticationResponse= JSON.parse(storedUser)
        const token = authResponse.token
        if(token){
           const authReq = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
           })
            console.log('Request intercepted with token');
            return next(authReq)
        }
    }
    console.log('Request intercepted without token');
    return next(request);
}