import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectsIds } from 'src/app/core/models/projects.model';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public dtOptions: DataTables.Settings = {};
  persons: any[] = [];

  
  public selectedItems: ProjectsIds[];
  public dropdownList: any[];
  public isAll: boolean;
  public showFilter = true;
  public dropdownSettings = {};

  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient, private serviceProjects: ProjectsService) {
  }


  ngOnInit(): void {
    debugger;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.cargarDT();
    this.ConfigurarMultiSelect();
    this.LoadProjectxUser();


  }

  cargarDT() {
    this.httpClient.post(`${environment.urlApi}ProjectDetails/GetRegion`, '').subscribe((data: any) => {
      this.persons = Object.assign(data['Data']);
      this.dtTrigger.next();
    });
  }



  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }







  dropdownProperties() {
    let dropdown = {
      selectedValue: this.selectedItems,
      Isvalidate: this.selectedItems.length === 0 ? false : true,
    }
    return dropdown;
  }

  onSelectAll(items: any) {
    if (this.isAll) {
      this.isAll = false;
    } else {
      this.isAll = true;
    }
  }

  onDeselect(items: any) {
    this.isAll = false;
  }

  onItemSelect(selectedValue: any) {
    var filterArray = [];
    filterArray.push(selectedValue);
    var data = this.dropdownList.filter(function (item) {
      return filterArray.indexOf(item.NombreProyecto) > -1;
    });
  }


  ConfigurarMultiSelect() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'codigo',
      textField: 'nombre',
      selectAllText: 'Seleccionar Todo',
      unSelectAllText: 'Deseleccionar Todo',
      searchPlaceholderText: "Buscar",
      noDataAvailablePlaceholderText: "Datos no encontrados",
      itemsShowLimit: 1,
      allowSearchFilter: this.showFilter,
    };
  }

  LoadProjectxUser() {
    this.serviceProjects.getProjectxUser().subscribe(
      data => {
        this.dropdownList = Object.assign(data['Data']);
      }, error => console.log(error));
  }








}
