import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  // const localstor = localStorage.getItem('userToken')
  const token = localStorage.getItem('userToken')
  const router = inject(Router)
  if(token){
    return true
  }
else{
router.navigateByUrl('signIn')
  return false;
}
};
