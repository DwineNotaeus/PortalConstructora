import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { ConstructorService } from 'src/app/core/services/constructor.service';
import { ContactsService } from 'src/app/core/services/contacts.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-to-update-constructor-contacts',
  templateUrl: './to-update-constructor-contacts.component.html',
  styleUrls: ['./to-update-constructor-contacts.component.css']
})
export class ToUpdateConstructorContactsComponent implements OnInit {

  public dropdownSettings = {};
  public showFilter = true;
  public dropdownList: any[];
  public isAll: boolean;
  public selectedItems: any[];


  public ListContacts: [];
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  public showDatagrid: boolean = false;

  constructor(private serviceConstructor: ConstructorService, private serviceContacts: ContactsService, private serviceUtilities: UtilitiesService) { }

  ngOnInit(): void {
    this.dtOptions = this.serviceUtilities.optionsDatatable();
    this.configurarMultiSelect();
    this.loadDropdownList();
  }

  configurarMultiSelect() {
    this.dropdownSettings = {
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

  loadDropdownList() {
    this.serviceConstructor.getAllConstructorList().subscribe(
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


  onSubmit(inputSearch: NgForm) {
    debugger;
    if (inputSearch.controls['inputSearch'].value !== undefined) {
      let idConstructora = inputSearch.controls['inputSearch'].value[0].idConstructora;
      this.showDatagrid = true;

      var formData = new FormData();
      formData.append('IdConstructora', idConstructora)

      this.serviceContacts.getListContacts(formData).subscribe(data => {
        this.ListContacts = Object.assign(data['Data']);
        this.dtTrigger.next();
      }, error => console.log(error));

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not authorised to visit this page!',
      });
    }
  }


}
