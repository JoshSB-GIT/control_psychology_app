import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from 'src/app/services/userServices/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import 'datatables.net';
import { RolesService } from 'src/app/services/rolesServices/roles.service';
import { DocumentTypeService } from 'src/app/services/documentTypeServices/document-type.service';

@Component({
  selector: 'app-basic-users',
  standalone: true,
  imports: [CommonModule, SharedModule, DialogModule, ButtonModule],
  templateUrl: './basic-users.component.html',
  styleUrls: ['./basic-users.component.scss'],
})
export default class UsersComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public usersData: any = [];
  public rolesData: any = [];
  public documentTypeData: any = [];

  public visible: boolean = false;
  public updateFormGroup: FormGroup;
  public usersForm: FormGroup;

  public selectedUser: any = [];
  public user_id: number = 0;

  public userData: any = {};

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private DocumentTypeService: DocumentTypeService,
  ) {}

  ngAfterViewInit(): void {
    $(document).ready(() => {
      $('#yourTableId').DataTable();
    });
  }

  ngOnDestroy(): void {
    const table = $('#yourTableId').DataTable();
    table.destroy();
  }

  ngOnInit(): void {
    this.getUsers();
    this.getDocumentTypes();
    this.getRoles();
    this.usersForm = this.formBuilder.group({
      name: ['', Validators.required],
      middlename: ['', [Validators.required]],
      first_lastname: ['', [Validators.required]],
      second_lastname: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      age: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      document_type_id: ['', [Validators.required]],
      rol_id: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.updateFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      middlename: ['', [Validators.required]],
      first_lastname: ['', [Validators.required]],
      second_lastname: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      age: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      document_type_id: ['', [Validators.required]],
      rol_id: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public getRoles(): void {
    const data = {};
    this.rolesService.get_roles(data).subscribe(
      (response) => {
        this.rolesData = response.data;
        console.log(this.rolesData);
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    );
  }

  public getDocumentTypes(): void {
    const data = {};
    this.DocumentTypeService.get_document_types(data).subscribe(
      (response) => {
        this.documentTypeData = response.data;
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    );
  }

  public showDialog(user: any) {
    this.visible = true;
    if (user) {
      this.selectedUser = user;
      this.user_id = this.selectedUser.user_id;
      this.updateFormGroup.patchValue({
        name: this.selectedUser.name,
        middlename: this.selectedUser.middlename,
        first_lastname: this.selectedUser.first_lastname,
        second_lastname: this.selectedUser.second_lastname,
        identification: this.selectedUser.identification,
        age: this.selectedUser.age,
        telephone: this.selectedUser.telephone,
        phone: this.selectedUser.phone,
        document_type_id: this.selectedUser.document_type_id,
        rol_id: this.selectedUser.rol_id,
        username: this.selectedUser.username,
        password: this.selectedUser.password,
      });
    }
    console.log(this.user_id);
  }

  public getUsers() {
    const requestData = {};

    this.userService.get_users(requestData).subscribe(
      (response) => {
        this.usersData = response.data;
        // Destruir la tabla existente
        const table = $('#yourTableId').DataTable();
        table.destroy();
        // Crear la tabla con los datos actualizados
        $(document).ready(() => {
          $('#yourTableId').DataTable();
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    );
  }

  public addUser(event: Event) {
    event.preventDefault();
    this.userData = {
      name: this.usersForm.value.name,
      middlename: this.usersForm.value.middlename,
      first_lastname: this.usersForm.value.first_lastname,
      second_lastname: this.usersForm.value.second_lastname,
      identification: this.usersForm.value.identification,
      age: this.usersForm.value.age,
      telephone: this.usersForm.value.telephone,
      phone: this.usersForm.value.phone,
      document_type_id: this.usersForm.value.document_type_id,
      rol_id: this.usersForm.value.rol_id,
      username: this.usersForm.value.username,
      password: this.usersForm.value.password,
    };
    this.userService.add_users(this.userData).subscribe(
      (response) => {
        Swal.fire({
          title: 'success',
          text: 'Usuario añadido',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.getUsers();
        this.usersForm = this.formBuilder.group({
          name: '',
          middlename: '',
          first_lastname: '',
          second_lastname: '',
          identification: '',
          age: '',
          telephone: '',
          phone: '',
          document_type_id: '',
          rol_id: '',
          username: '',
          password: '',
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    );
    console.log(this.usersForm.value);
  }

  public updateUsers() {
    this.visible = false;
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Todo está bien escrito?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userData = {
          name: this.updateFormGroup.value.name,
          middlename: this.updateFormGroup.value.middlename,
          first_lastname: this.updateFormGroup.value.first_lastname,
          second_lastname: this.updateFormGroup.value.second_lastname,
          identification: this.updateFormGroup.value.identification,
          age: this.updateFormGroup.value.age,
          telephone: this.updateFormGroup.value.telephone,
          phone: this.updateFormGroup.value.phone,
          document_type_id: this.updateFormGroup.value.document_type_id,
          rol_id: this.updateFormGroup.value.rol_id,
          username: this.updateFormGroup.value.username,
          password: this.updateFormGroup.value.password,
          user_id: this.user_id,
        };

        this.userService.update_user(this.userData).subscribe(
          (response) => {
            Swal.fire({
              title: 'Usuario actualizado',
              text: 'Usuario actualizado con éxito',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.getUsers();
            this.updateFormGroup.patchValue({
              name: '',
              middlename: '',
              first_lastname: '',
              second_lastname: '',
              identification: '',
              age: '',
              telephone: '',
              phone: '',
              document_type_id: '',
              rol_id: '',
              username: '',
              password: '',
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          },
        );
        Swal.fire('Usuario actualziado', '', 'success');
      } else if (result.isDenied) {
        this.visible = true;
        // Swal.fire('Changes are not saved', '', 'info');
      }
    });
    console.log(this.updateFormGroup.value, this.user_id);
  }

  public deleteUser(user: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro que quieres eliminar al usuario ${user.name} ${user.first_lastname} ?`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (user) {
          this.userService.delete_user({user_id: user.user_id}).subscribe(
            (response) => {
              Swal.fire({
                title: 'Usuario eliminado',
                text: response.data,
                icon: 'success',
                confirmButtonText: 'Ok',
              });
              this.getUsers();
            },
            (error) => {
              Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            },
          );
          Swal.fire('Usuario actualziado', '', 'success');
        }
      } else if (result.isDenied) {
      }
    });
    console.log(this.selectedUser, user.user_id);
  }
}
