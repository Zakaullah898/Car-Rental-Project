import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  // const localstor = localStorage.getItem('userToken')
  const localstor = localStorage.getItem('userEmail')
  const router = inject(Router)
  if(localstor != null){
    return true
  }
else{
router.navigateByUrl('signIn')
  return false;
}
};
