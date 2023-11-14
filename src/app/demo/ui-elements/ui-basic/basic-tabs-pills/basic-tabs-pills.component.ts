// import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as $ from 'jquery';
// import Swal from 'sweetalert2';
// import 'datatables.net';

// @Component({
//   selector: 'app-basic-tabs-pills',
//   standalone: true,
//   imports: [CommonModule, SharedModule],
//   templateUrl: './basic-tabs-pills.component.html',
//   styleUrls: ['./basic-tabs-pills.component.scss'],
// })
// export default class BasicTabsPillsComponent
//   implements OnInit, AfterViewInit, OnDestroy
// {
//   ngAfterViewInit(): void {
//     $(document).ready(() => {
//       $('#yourTableId').DataTable();
//     });
//   }

//   ngOnDestroy(): void {
//     const table = $('#yourTableId').DataTable();
//     table.destroy();
//   }

//   ngOnInit(): void {
//     this.getCitation();
//     this.citationForm = this.formBuilder.group({
//       citation_date: [null, Validators.required],
//       description: ['', [Validators.required]],
//       psychologist_id: ['', [Validators.required]],
//       patient_id: ['', [Validators.required]],
//     });

//     this.updateFormGroup = this.formBuilder.group({
//       citation_date: [null, Validators.required],
//       description: ['', [Validators.required]],
//       psychologist_id: ['', [Validators.required]],
//       patient_id: ['', [Validators.required]],
//     });
//     this.getPatient();
//     this.getPsycho();
//   }
// }
