import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Stepper from 'bs-stepper';
import { contactsByProject, Projects } from 'src/app/core/models/projects.model';
import { ConstructorService } from 'src/app/core/services/constructor.service';
import { LocationService } from 'src/app/core/services/location.service';
import { ProjectsService } from 'src/app/core/services/projects.service';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  public modelProjects: Projects;
  public modelContactsByProject: contactsByProject;
  public isAll: boolean;
  public showFilter = true;
  public selectedItems: [];
  public dropdownList: any[];
  public dropdownSettings = {};
  public ListaConstructorasUsuario: [];
  public ListRegions: [];
  public ListDepartaments: [];
  public ListCity: [];


  selectedRegion: any = {};
  selectedDepartament: any = {};

  private stepper: Stepper;

  constructor(private serviceProjects: ProjectsService, private serviceConstructor: ConstructorService, private serviceLocation: LocationService) {
    this.modelProjects = new Projects();
    this.modelContactsByProject = new contactsByProject();
  }

  ngOnInit(): void {

    this.setUpStepper();
    this.ConfigurarMultiSelect();
    this.loadConstructorByUser();
    this.loadRegions();
  }

  setUpStepper() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
  }

  loadConstructorByUser() {

    this.serviceConstructor.getAllConstructorList().subscribe(data => {
      this.dropdownList = Object.assign(data['Data']);
      this.ListaConstructorasUsuario = Object.assign(data['Data']);
    }, error => console.log(error));

  }

  loadRegions() {
    this.serviceLocation.getAllRegion().subscribe(data => {
      console.log('data', data);
      this.ListRegions = data;
      // this.ListRegions = Object.assign(data['Data']);
      console.log('ListRegions', this.ListRegions)
    }, error => console.log(error));
  }

  changeRegion() {
    this.serviceLocation.getDepartamentByIdRegion(this.selectedRegion.Id).subscribe(
      data => {
        this.ListDepartaments = Object.assign(data['Data']);
      }, error => console.log(error));
  }

  changeDepartament() {
    console.log('selectedDepartament', this.selectedDepartament.Id);
    this.serviceLocation.getCityByIdDepartament(this.selectedDepartament.Id).subscribe(
      data => {
        this.ListCity = Object.assign(data['Data']);
      }, error => console.log(error));
  }




  ConfigurarMultiSelect() {
    this.dropdownSettings = {
      singleSelection: false,
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

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  onSubmit(form: NgForm) {
    alert('ok');
    console.log('Info. crear proyecto', form.value);
    console.log('Extraer valores', form.controls['IdTipoContacto'].value);

    console.log('projectModel', this.modelProjects);
    console.log('contactModel', this.modelContactsByProject);

    if (form.invalid) {
			return;
		}

    this.serviceProjects.createProject(this.modelProjects, this.modelContactsByProject).subscribe(data => {
      if (data == true) {
        "Guardado correctamente!"
        
      } else {
        "El registro ya existe en el sistema!"
      }
    }, error => console.log(error));


  }

}