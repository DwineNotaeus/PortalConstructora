import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  persons: any[] = [];
  public dtOptions: DataTables.Settings = {};
  public userName: string;

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
    this.userName = inputSearch.controls['userName'].value;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
