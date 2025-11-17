import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import Swal from 'sweetalert2';
export const updateUserProfileGuard: CanDeactivateFn<unknown> = async (component, currentRoute, currentState, nextState) => {
const updateProfile = JSON.parse(localStorage.getItem('updateProfile') || 'false');

    // If no unsaved changes, allow navigation
    if (!updateProfile) {
      return true;
    }

    // Otherwise show SweetAlert2 confirmation
    const result = await Swal.fire({
      title: 'Unsaved Changes',
      text: 'You have unsaved changes. Do you really want to leave this page?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, leave page',
      cancelButtonText: 'Stay here',
      reverseButtons: true,
    });
    if(result.isConfirmed){
      localStorage.removeItem('updateProfile')
      return true;
    }
    // Return true if confirmed, false otherwise
    return true;
  
};
