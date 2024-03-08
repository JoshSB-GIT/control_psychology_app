import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import 'datatables.net';
import { ResultService } from 'src/app/services/resultServices/result.service';
import { CitationService } from 'src/app/services/citationServices/citation.service';

@Component({
  selector: 'app-basic-results',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-results.component.html',
  styleUrls: ['./basic-results.component.scss'],
})
export default class BasicTabsPillsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public resultsData: any = [];
  public citationsData: any = [];
  public resultForm: FormGroup;

  constructor(
    private resultService: ResultService,
    private formBuilder: FormBuilder,
    private citationService: CitationService,
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
    this.getResults();
    this.resultForm = this.formBuilder.group({
      feedback: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      appointment_id: ['', [Validators.required]],
    });
  }

  public getCitation(): void {
    const data = {};
    this.citationService.get_citations(data).subscribe(
      (response) => {
        this.citationsData = response.data;
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
    console.log(this.citationsData);
  }

  public getResults(): void {
    const data = {};
    this.resultService.get_results(data).subscribe(
      (response) => {
        this.resultsData = response.data;
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

  public addResult(event: Event) {
    event.preventDefault();
    this.resultsData = {
      feedback: this.resultForm.value.feedback,
      rating: this.resultForm.value.rating,
      appointment_id: parseInt(this.resultForm.value.appointment_id),
    };
    this.resultService.add_result(this.resultsData).subscribe(
      (response) => {
        Swal.fire({
          title: 'success',
          text: 'Resultado añadido',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.resultForm = this.formBuilder.group({
          feedback: '',
          rating: '',
          appointment_id: '',
        });
        this.getResults();
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

  public generateReport(): void {}
}
