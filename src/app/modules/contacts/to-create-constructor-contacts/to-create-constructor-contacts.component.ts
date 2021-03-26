import { Component, OnInit } from '@angular/core';
import { ConstructorService } from 'src/app/core/services/constructor.service';

@Component({
  selector: 'app-to-create-constructor-contacts',
  templateUrl: './to-create-constructor-contacts.component.html',
  styleUrls: ['./to-create-constructor-contacts.component.css']
})
export class ToCreateConstructorContactsComponent implements OnInit {
  public dropdownSettings = {};
  public showFilter = true;
  public dropdownList: any[];
  public isAll: boolean;
  public selectedItems: any[];

  constructor(private serviceConstructor: ConstructorService) { }

  ngOnInit(): void {
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

}
