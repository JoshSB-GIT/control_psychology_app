import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig, DialogModule],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class NavRightComponent {
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId: boolean;
  private ACCESTOKEN: string = '';
  public tokenPayload;

  public name;
  public first_lastname;

  visible: boolean = false;

  constructor(
    config: NgbDropdownConfig,
    private authService: AuthServiceService,
    private router: Router,
  ) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.ACCESTOKEN = localStorage.getItem('authToken');
    if (!this.ACCESTOKEN) {
      this.name = '';
      this.first_lastname = '';
    }
    this.tokenPayload = JSON.parse(atob(this.ACCESTOKEN.split('.')[1]));
    this.name = this.tokenPayload.name;
    this.first_lastname = this.tokenPayload.first_lastname;
    console.log(this.tokenPayload);
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }

  public removeTokenFromLocalStorage() {
    localStorage.removeItem('authToken');
  }

  public logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Ya te vas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe((data) => {
          this.removeTokenFromLocalStorage();
          this.router.navigate(['/auth/signin']);
        });
      }
    });
  }

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
