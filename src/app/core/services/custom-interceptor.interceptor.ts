import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const customInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log(req)
  const localStorToken = localStorage.getItem('userToken');
  console.log("in the interceptor : ", localStorToken)
  const clonReq = req.clone({
    setHeaders : {
      Authorization: `Bearer ${localStorToken}`,
    // 'Content-Type': 'application/json'
    }
  });
  // const headers = new HttpHeaders : `{'Content-Type': 'application/x-www-form-urlencoded'}`
  
  return next(clonReq)

};
