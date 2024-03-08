import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HistoryService } from 'src/app/services/historyServices/history.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import 'datatables.net';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-basic-typography',
  standalone: true,
  imports: [CommonModule, SharedModule, DialogModule],
  templateUrl: './basic-typography.component.html',
  styleUrls: ['./basic-typography.component.scss'],
})
export default class BasicTypographyComponent {
  public historysData: any = [];
  public updateFormGroup: FormGroup;
  public visible: boolean = false;
  public userData: any = {};

  constructor(
    private historyService: HistoryService,
    private formBuilder: FormBuilder,
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
    this.getHystory();

    this.updateFormGroup = this.formBuilder.group({
      user_id: ['', Validators.required],
      init_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  public generateReport(): void {
    const token: string | null = localStorage.getItem('authToken');
    if (token) {
      var id = this.decodeToken(token).user_id;
    } else {
      console.log('No se encontró ningún token.');
    }
    this.userData = {
      patient_id: this.updateFormGroup.value.user_id,
      init_date: this.updateFormGroup.value.init_date,
      end_date: this.updateFormGroup.value.end_date,
      psychologist_id: id,
    };

    // Llama al servicio para generar el informe
    this.historyService.get_report(this.userData).subscribe(
      (data: Blob) => {
        // Guarda el archivo generado
        saveAs(data, 'report.pdf');
      },
      (error) => {
        console.error('Error al generar el informe:', error);
        // Maneja el error según sea necesario
      }
    );

    console.log(this.userData);
    
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

  public getHystory() {
    const requestData = {};

    this.historyService.get_history(requestData).subscribe(
      (response) => {
        this.historysData = response.data;
        const table = $('#yourTableId').DataTable();
        table.destroy();
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

  public showDialog() {
    this.visible = true;
  }
}
