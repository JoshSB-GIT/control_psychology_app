import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HistoryService } from 'src/app/services/historyServices/history.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import 'datatables.net';

@Component({
  selector: 'app-basic-typography',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-typography.component.html',
  styleUrls: ['./basic-typography.component.scss'],
})
export default class BasicTypographyComponent {
  public historysData: any = [];

  constructor(private historyService: HistoryService) {}

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
  }

  public getHystory() {
    const requestData = {};

    this.historyService.get_history(requestData).subscribe(
      (response) => {
        this.historysData = response.data;
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
}
