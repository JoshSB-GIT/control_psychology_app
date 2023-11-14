import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RolesService } from 'src/app/services/rolesServices/roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentTypeService } from 'src/app/services/documentTypeServices/document-type.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import 'datatables.net';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic-roles',
  standalone: true,
  imports: [CommonModule, SharedModule, DialogModule, ButtonModule],
  templateUrl: './basic-roles.component.html',
  styleUrls: ['./basic-roles.component.scss'],
})
export default class BasicRolesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public rolesData: any = [];
  public documentTypeData: any = [];

  public visible: boolean = false;
  public updateFormGroup: FormGroup;
  public rolesForm: FormGroup;

  public selectedRol: any = [];
  public rol_id: number = 0;

  public rolData: any = {};

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
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
    this.getRoles();
    this.rolesForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.updateFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public showDialog(rol: any) {
    this.visible = true;
    if (rol) {
      this.selectedRol = rol;
      this.rol_id = this.selectedRol.rol_id;
      this.updateFormGroup.patchValue({
        name: this.selectedRol.name,
        description: this.selectedRol.description,
      });
    }
    console.log(this.rol_id);
  }

  public getRoles(): void {
    const data = {};
    this.rolesService.get_roles(data).subscribe(
      (response) => {
        this.rolesData = response.data;
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

  public addRol(event: Event) {
    event.preventDefault();
    this.rolData = {
      name: this.rolesForm.value.name,
      description: this.rolesForm.value.description,
    };
    this.rolesService.add_rol(this.rolData).subscribe(
      (response) => {
        Swal.fire({
          title: 'success',
          text: 'Rol añadido',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.rolesForm = this.formBuilder.group({
          name: '',
          description: '',
        });
        this.getRoles();
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
    console.log(this.rolesForm.value);
  }

  public updateRoles() {
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
        this.rolData = {
          name: this.updateFormGroup.value.name,
          description: this.updateFormGroup.value.description,
          rol_id: this.rol_id
        };

        this.rolesService.update_rol(this.rolData).subscribe(
          (response) => {
            Swal.fire({
              title: 'Usuario actualizado',
              text: 'Usuario actualizado con éxito',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.getRoles();
            this.updateFormGroup.patchValue({
              name: '',
              description: '',
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: error.data,
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
    console.log(this.updateFormGroup.value, this.rol_id);
  }

  public deleteRoles(rol: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro que quieres eliminar el rol '${rol.name}'?`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (rol) {
          this.rolesService.delete_rol({ rol_id: rol.rol_id }).subscribe(
            (response) => {
              Swal.fire({
                title: 'Usuario eliminado',
                text: response.data,
                icon: 'success',
                confirmButtonText: 'Ok',
              });
              this.getRoles();
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
          Swal.fire('Rol eliminado', '', 'success');
        }
      } else if (result.isDenied) {
      }
    });
  }
}
