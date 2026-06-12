import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  success(title: string, text: string, timer: number = 2000) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      timer,
      showConfirmButton: false,
    });
  }

  error(title: string, text: string) {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#0d6efd'
    });
  }

  warning(title: string, text: string) {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonColor: '#f59e0b'
    });
  }

  info(title: string, text: string) {
    return Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: '#0d6efd'
    });
  }

  confirmDelete(itemName: string = 'this item', customTitle?: string, customText?: string): Promise<boolean> {
    return Swal.fire({
      title: customTitle || 'Are you sure?',
      text: customText || `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Delete'
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}
