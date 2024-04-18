import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const authToken = authService.getToken()
  // Clone the request and add the authorization header
  const authRequest = req.clone({
    headers: req.headers.set("Authorization", "Bearer " + authToken)
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authRequest);
};
