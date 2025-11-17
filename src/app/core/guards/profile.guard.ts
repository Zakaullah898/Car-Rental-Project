import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const profileGuard: CanActivateFn = (route, state) => {
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);
   const token = localStorage.getItem('userToken');
   const hasProfile = JSON.parse(localStorage.getItem('hasProfile') || 'false');
   
   
  if (!token) {
    // 🚫 Not logged in
    router.navigateByUrl('signIn');
    return false;
  }

  if (!hasProfile) {
    snackBar.open('Please create your profile first.', 'OK', 
      { 
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top' ,
      panelClass: ['custom-snackbar']
    });
    // 🚫 Logged in but has no profile
    router.navigateByUrl('profile-form');
    return false;
  }


  // ✅ Logged in and profile created
  return true;
};
