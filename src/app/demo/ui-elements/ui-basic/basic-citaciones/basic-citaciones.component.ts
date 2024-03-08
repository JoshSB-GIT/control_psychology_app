import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import 'datatables.net';
import { CitationService } from 'src/app/services/citationServices/citation.service';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-basic-citaciones',
  standalone: true,
  imports: [CommonModule, SharedModule, DialogModule, ButtonModule],
  templateUrl: './basic-citaciones.component.html',
  styleUrls: ['./basic-citaciones.component.scss'],
})
export default class BasicCitacionesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public citationsData: any = [];
  public patientsData: any = [];
  public psychosData: any = [];

  public visible: boolean = false;
  public updateFormGroup: FormGroup;
  public citationForm: FormGroup;

  public selectedCitation: any = [];
  public citation_id: number = 0;

  public citationData: any = {};

  constructor(
    private citationService: CitationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
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
    this.getCitation();
    this.citationForm = this.formBuilder.group({
      citation_date: [null, Validators.required],
      description: ['', [Validators.required]],
      psychologist_id: ['', [Validators.required]],
      patient_id: ['', [Validators.required]],
    });

    this.updateFormGroup = this.formBuilder.group({
      citation_date: [null, Validators.required],
      description: ['', [Validators.required]],
      psychologist_id: ['', [Validators.required]],
      patient_id: ['', [Validators.required]],
    });
    this.getPatient();
    this.getPsycho();
    this.get();
  }

  public showDialog(citation: any) {
    this.visible = true;
    if (citation) {
      this.selectedCitation = citation;
      console.log(this.selectedCitation);

      this.citation_id = citation.citation_id;
    }
    console.log(this.citation_id);
  }

  public getPsycho(): void {
    let data = {
      rol_id: 2,
    };
    this.userService.get_users(data).subscribe(
      (response) => {
        this.psychosData = response.data;
        console.log(this.psychosData);
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

  public getPatient(): void {
    let data = {
      rol_id: 3,
    };
    this.userService.get_users(data).subscribe(
      (response) => {
        this.patientsData = response.data;
        console.log(this.patientsData);
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

  public getCitation(): void {
    const data = {};
    this.citationService.get_citations(data).subscribe(
      (response) => {
        this.citationsData = response.data;
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

  public addCitation(event: Event) {
    event.preventDefault();
    this.citationData = {
      citation_date: this.citationForm.value.citation_date,
      description: this.citationForm.value.description,
      psychologist_id: this.citationForm.value.psychologist_id,
      patient_id: this.citationForm.value.patient_id,
    };
    this.citationService.add_citation(this.citationData).subscribe(
      (response) => {
        Swal.fire({
          title: 'success',
          text: 'Cíta añadida',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.citationForm = this.formBuilder.group({
          citation_date: '',
          description: '',
          psychologist_id: '',
          patient_id: '',
        });
        this.getCitation();
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

  public updateCitation() {
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
        this.citationData = {
          citation_date: this.updateFormGroup.value.citation_date,
          description: this.updateFormGroup.value.description,
          psychologist_id: this.updateFormGroup.value.psychologist_id,
          patient_id: this.updateFormGroup.value.patient_id,
          citation_id: this.citation_id,
        };
        console.log(this.citationData);
        this.citationService.update_citation(this.citationData).subscribe(
          (response) => {
            Swal.fire({
              title: 'Cita actualizada',
              text: 'Cita actualizada con éxito',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.getCitation();
            this.updateFormGroup.patchValue({
              citation_date: '',
              description: '',
              psychologist_id: '',
              patient_id: '',
            });
          },
          (error) => {
            console.log(error);

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
  }

  public deleteCitation(cita: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro que quieres eliminar la cita con fecha '${cita.citation_date}'?`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (cita) {
          this.citationService
            .delete_citation({ citation_id: cita.citation_id })
            .subscribe(
              (response) => {
                Swal.fire({
                  title: 'Cíta eliminada',
                  text: response.data,
                  icon: 'success',
                  confirmButtonText: 'Ok',
                });
                this.getCitation();
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
          Swal.fire('Cíta eliminada', '', 'success');
        }
      } else if (result.isDenied) {
      }
    });
  }

  public rol: number = 0;

  get() {
    const token: string | null = localStorage.getItem('authToken');
    if (token) {
      this.rol = this.decodeToken(token).rol;
      console.log('Token Data ss  :', this.rol);
    } else {
      console.log('No se encontró ningún token.');
    }
  }

  private decodeToken(token: string): any {
    try {
      // Divide el token en partes (cabecera, payload, firma)
      const payloadBase64 = token.split('.')[1];
      // Decodifica la parte del payload
      const decodedPayload = atob(payloadBase64);
      // Convierte el payload decodificado a un objeto JSON
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
