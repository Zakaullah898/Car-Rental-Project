import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const customInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log(req)
  const localStorToken = localStorage.getItem('userToken');
  
  const clonReq = req.clone({
    setHeaders : {
      Authorization: `Beare ${localStorToken}`,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  // const headers = new HttpHeaders : `{'Content-Type': 'application/x-www-form-urlencoded'}`
  
  return next(clonReq)

};
