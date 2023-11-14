import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import 'datatables.net';
import { UserService } from 'src/app/services/userServices/user.service';
import { VisitService } from 'src/app/services/visitServices/visit.service';
import { HistoryService } from 'src/app/services/historyServices/history.service';

@Component({
  selector: 'app-basic-visitas',
  standalone: true,
  imports: [CommonModule, SharedModule, DialogModule, ButtonModule],
  templateUrl: './basic-visitas.component.html',
  styleUrls: ['./basic-visitas.component.scss'],
})
export default class BreadcrumbPagingComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public visible: boolean;

  public visitsData: any = [];
  public patientsData: any = [];
  public psychosData: any = [];

  public visitsForm: FormGroup;
  public updateFormGroup: FormGroup;

  public visitData: any = {};
  public visit_id: number = 0;
  public selectedVisit: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private visitService: VisitService,
    private historyService: HistoryService,
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
    this.getVisits();
    this.visitsForm = this.formBuilder.group({
      notes: [null, Validators.required],
      visit_date: ['', [Validators.required]],
      psychologist_id: ['', [Validators.required]],
      patient_id: ['', [Validators.required]],
    });

    this.updateFormGroup = this.formBuilder.group({
      notes: [null, Validators.required],
      visit_date: ['', [Validators.required]],
      psychologist_id: ['', [Validators.required]],
      patient_id: ['', [Validators.required]],
    });
    this.getPatients();
    this.getPsychos();
  }

  public showDialog(visit: any) {
    this.visible = true;
    if (visit) {
      this.updateFormGroup = this.formBuilder.group({
        notes: visit.notes,
        visit_date: visit.visit_date,
        psychologist_id: visit.psychologist_id,
        patient_id: visit.patient_id,
      });
      this.visit_id = visit.visit_id;
    }
    console.log(this.visit_id);
  }

  public getPsychos(): void {
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

  public getPatients(): void {
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

  public getVisits(): void {
    const data = {};
    this.visitService.get_visits(data).subscribe(
      (response) => {
        this.visitsData = response.data;
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

  public addVisits(event: Event) {
    event.preventDefault();
    this.visitData = {
      notes: this.visitsForm.value.notes,
      visit_date: this.visitsForm.value.visit_date,
      psychologist_id: this.visitsForm.value.psychologist_id,
      patient_id: this.visitsForm.value.patient_id,
    };
    this.visitService.add_visit(this.visitData).subscribe(
      (response) => {
        Swal.fire({
          title: 'success',
          text: 'Visita añadida',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.historyService
          .add_history({
            psychologist_id: this.visitsForm.value.psychologist_id,
            patient_id: this.visitsForm.value.patient_id,
          })
          .subscribe((response) => {
            console.log(response);
            
          });
        this.visitsForm = this.formBuilder.group({
          notes: '',
          visit_date: '',
          psychologist_id: '',
          patient_id: '',
        });
        this.getVisits();
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

  public updateVisit() {
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
        this.visitData = {
          notes: this.updateFormGroup.value.notes,
          visit_date: this.updateFormGroup.value.visit_date,
          psychologist_id: this.updateFormGroup.value.psychologist_id,
          patient_id: this.updateFormGroup.value.patient_id,
          visit_id: this.visit_id,
        };
        console.log(this.visitData);
        this.visitService.update_visit(this.visitData).subscribe(
          (response) => {
            Swal.fire({
              title: 'Cita actualizada',
              text: 'Cita actualizada con éxito',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.getVisits();
            this.updateFormGroup.patchValue({
              notes: '',
              visit_date: '',
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
        Swal.fire('Notas actualziadas', '', 'success');
      } else if (result.isDenied) {
        this.visible = true;
        // Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  public deleteVisit(visita: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro que quieres eliminar la visita con fecha '${visita.visit_date}'?`,
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (visita) {
          this.visitService
            .delete_visit({ visit_id: visita.visit_id })
            .subscribe(
              (response) => {
                Swal.fire({
                  title: 'Visita eliminada',
                  text: response.data,
                  icon: 'success',
                  confirmButtonText: 'Ok',
                });
                this.getVisits();
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
          Swal.fire('Visita eliminada', '', 'success');
        }
      } else if (result.isDenied) {
      }
    });
  }
}
