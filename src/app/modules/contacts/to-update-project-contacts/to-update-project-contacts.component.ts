import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ProjectsIds } from 'src/app/core/models/projects.model';
import { ConstructorService } from 'src/app/core/services/constructor.service';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-to-update-project-contacts',
  templateUrl: './to-update-project-contacts.component.html',
  styleUrls: ['./to-update-project-contacts.component.css']
})
export class ToUpdateProjectContactsComponent implements OnInit, OnDestroy, AfterViewInit {

  public isAll: boolean;
  public showFilter = true;
  public dropdownConstructorSettings = {};
  public dropdownProjectSettings = {};
  public dropdownListConstructor: any[];
  public dropdownListProjects: any[];
  public selectedItemsConstructor: any[];
  public selectedItemsProjects: ProjectsIds[];

  public ListContacts: [];
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  public showDatagrid: boolean = false;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private serviceProjects: ProjectsService, private serviceConstructor: ConstructorService, private serviceContacts: ContactsService, private serviceUtilities: UtilitiesService) { }

  ngOnInit(): void {
    this.dtOptions = this.serviceUtilities.optionsDatatable();

    this.configurarMultiSelectConstructor();
    this.configurarMultiSelectProjects();
    this.loadDropdownListConstructor();
    this.loadDropdownListProject();

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  configurarMultiSelectConstructor() {
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

  onSubmit(inputSearch: NgForm) {

    console.log(inputSearch.controls['inputSearchConstructor'].value);
    console.log(inputSearch.controls['inputSearchProjects'].value);
    if (inputSearch.controls['inputSearchConstructor'].value !== undefined && inputSearch.controls['inputSearchProjects'].value !== undefined) {
      let idConstructora = inputSearch.controls['inputSearchConstructor'].value[0].idConstructora;
      let idProyecto = inputSearch.controls['inputSearchProjects'].value[0].codigo;
      this.showDatagrid = true;

      var formData = new FormData();
      formData.append('IdConstructora', idConstructora)
      formData.append('IdProyecto', idProyecto)

      this.serviceContacts.getListContactsByProject(formData).subscribe(data => {
        this.ListContacts = Object.assign(data['Data']);
        this.dtTrigger.next();
      }, error => console.log(error));

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not authorised to visit this page!',
      });
    }
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
    debugger;
    var filterArray = [];
    filterArray.push(selectedValue);
    console.log('selectedValue', selectedValue.idConstructora);

    // Metodo opcional para carga en cascada después de validar con el funcional
    // this.serviceProjects.getProjectByUser().subscribe(
    //   data => {
    //     this.dropdownListProjects = Object.assign(data['Data']);
    //   }, error => console.log(error));

  }

}
