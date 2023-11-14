import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss'],
})
export class NavLeftComponent {
  showDialog() {
    Swal.fire({
      title: 'Ups...',
      text: 'Esta acción solo está disponible para la versión Pro Plus Max S Ultra X de la aplicación',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok',
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  }
}
