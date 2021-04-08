import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  persons: any[] = [];
  public dtOptions: DataTables.Settings = {};
  public nameConstructor: string;

  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(private serviceUtilities: UtilitiesService) {
  }

  ngOnInit(): void {
    this.dtOptions = this.serviceUtilities.optionsDatatable();
  }

  onSubmit(inputSearch: NgForm) {
    console.log(inputSearch.value);

    if (inputSearch.invalid) {
      return;
    }
    this.nameConstructor = inputSearch.controls['inputSearch'].value;
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
