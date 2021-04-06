import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  persons: any[] = [];
  public dtOptions: DataTables.Settings = {};  
  public dtTrigger: Subject<any> = new Subject<any>();
  public userName: string;

  constructor(private serviceUtilities: UtilitiesService) {     
  }

  ngOnInit(): void {
    this.dtOptions = this.serviceUtilities.optionsDatatable();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onSubmit(inputSearch: NgForm) {

    console.log(inputSearch.value);

    if (inputSearch.invalid) {
      return;
    }
    this.userName = inputSearch.controls['userName'].value;
    
  }

}
