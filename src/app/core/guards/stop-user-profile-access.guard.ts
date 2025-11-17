import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const stopUserProfileAccessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const updateProfile = JSON.parse(localStorage.getItem('updateProfile') || 'false');
  const hasProfile = JSON.parse(localStorage.getItem('hasProfile') || 'false');
  if(updateProfile =="" && hasProfile){
    router.navigateByUrl('home');
    return false;
  }
  return true;
};
