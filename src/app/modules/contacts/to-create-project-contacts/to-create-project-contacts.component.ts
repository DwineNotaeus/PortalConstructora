import { Component, OnInit } from '@angular/core';
import { ProjectsIds } from 'src/app/core/models/projects.model';
import { ConstructorService } from 'src/app/core/services/constructor.service';
import { ProjectsService } from 'src/app/core/services/projects.service';

@Component({
  selector: 'app-to-create-project-contacts',
  templateUrl: './to-create-project-contacts.component.html',
  styleUrls: ['./to-create-project-contacts.component.css']
})
export class ToCreateProjectContactsComponent implements OnInit {
  public isAll: boolean;
  public showFilter = true;
  public dropdownConstructorSettings = {};
  public dropdownProjectSettings = {};
  public dropdownListConstructor: any[];
  public dropdownListProjects: any[];
  public selectedItemsConstructor: any[];
  public selectedItemsProjects: ProjectsIds[];

  constructor(private serviceProjects: ProjectsService, private serviceConstructor: ConstructorService) {
  }

  ngOnInit(): void {
    this.configurarMultiSelectConstructor();
    this.configurarMultiSelectProjects();
    this.loadDropdownListConstructor();
    this.loadDropdownListProject();
  }

  configurarMultiSelectConstructor(){
    this.dropdownConstructorSettings = {
      singleSelection: true,
      idField: 'idConstructora',
      textField: 'Nombre',
      selectAllText: 'Seleccionar Todo',
      unSelectAllText: 'Deseleccionar Todo',
      searchPlaceholderText: "Buscar",
      noDataAvailablePlaceholderText: "Datos no encontrados",
      itemsShowLimit: 1,
      allowSearchFilter: this.showFilter,
    };
  }

  configurarMultiSelectProjects() {
    this.dropdownProjectSettings = {
      singleSelection: true,
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

  loadDropdownListConstructor() {
    this.serviceConstructor.getAllConstructorList().subscribe(
      data => {
        this.dropdownListConstructor = Object.assign(data['Data']);
      }, error => console.log(error));
  }

  loadDropdownListProject() {
    this.serviceProjects.getProjectByUser().subscribe(
      data => {
        this.dropdownListProjects = Object.assign(data['Data']);
      }, error => console.log(error));
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
    var data = this.dropdownListProjects.filter(function (item) {
      return filterArray.indexOf(item.NombreProyecto) > -1;
    });
  }


}
