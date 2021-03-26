import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProjectsIds } from 'src/app/core/models/projects.model';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public dtOptions: DataTables.Settings = {};
  public ListContacts: [];


  public selectedItems: ProjectsIds[];
  public dropdownList: any[];
  public isAll: boolean;
  public showFilter = true;
  public dropdownSettings = {};

  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(private serviceProjects: ProjectsService, private serviceContacts: ContactsService, private serviceUtilities: UtilitiesService) {
  }


  ngOnInit(): void {
    this.dtOptions = this.serviceUtilities.optionsDatatable();
    this.configurarMultiSelect();
    this.loadDropdownList();
    this.loadContactsByProject();
  }

  loadContactsByProject() {
    var formData = new FormData();
    formData.append('IdConstructora', '7029');
    formData.append('IdProyecto', '46365');

    this.serviceContacts.getListContactsByProject(formData).subscribe(data => {
      this.ListContacts = Object.assign(data['Data']);
      console.log('ListContacts', this.ListContacts)
      this.dtTrigger.next();
    }, error => console.log(error));
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


  configurarMultiSelect() {
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

  loadDropdownList() {
    this.serviceProjects.getProjectByUser().subscribe(
      data => {
        this.dropdownList = Object.assign(data['Data']);
      }, error => console.log(error));
  }








}
