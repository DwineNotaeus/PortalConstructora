import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/core/services/projects.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  public dropdownSettings = {};
  public showFilter = true;
  public dropdownList: any[];
  public isAll: boolean;
  public selectedItems: any[];

  constructor(private serviceProjects: ProjectsService) { }

  ngOnInit(): void {
    this.configurarMultiSelect();
    this.loadDropdownList();
  }

  configurarMultiSelect() {
    this.dropdownSettings = {
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

  loadDropdownList() {
    this.serviceProjects.getProjectByUser().subscribe(
      data => {
        this.dropdownList = Object.assign(data['Data']);
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
    var data = this.dropdownList.filter(function (item) {
      return filterArray.indexOf(item.idConstructora) > -1;
    });
  }


}
