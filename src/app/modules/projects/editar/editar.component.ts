import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import Stepper from 'bs-stepper';
import { Subject } from 'rxjs';
import { FileUtilities } from 'src/app/core/models/file-utilities';
import { Projects } from 'src/app/core/models/projects.model';
import { ConstructorService } from 'src/app/core/services/constructor.service';
import { LocationService } from 'src/app/core/services/location.service';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit, OnDestroy, AfterViewInit {

  private stepper: Stepper;
  public lstProject: [];
  public ListRegions: [];
  public ListDepartaments: [];
  public ListCity: [];
  public nombreProyecto: string;
  public modelProjects: Projects;
  public objEditProject: Projects;
  private fileUtilities: FileUtilities;
  public ListaConstructorasUsuario: [];
  public dtOptions: DataTables.Settings = {};
  public selectedConstructionCompany: any = {};
  public selectedRegion: any = {};
  public selectedDepartament: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private projectService: ProjectsService, private serviceConstructor: ConstructorService, private serviceLocation: LocationService, private serviceUtilities: UtilitiesService) {
    this.modelProjects = new Projects();
    this.objEditProject = new Projects();
    this.fileUtilities = new FileUtilities();
  }

  ngOnInit(): void {
    this.dtOptions = this.serviceUtilities.optionsDatatable();
    this.cargarStepper();
    this.loadRegions();
    this.loadConstructorByUser();
    console.log('CodigoRegion', this.projectService.selectedProject.CodigoRegion);
  }

  loadConstructorByUser() {
    this.serviceConstructor.getAllConstructorList().subscribe(data => {
      this.ListaConstructorasUsuario = Object.assign(data['Data']);
    }, error => console.log(error));
  }

  onPreUpdate(elemento: Projects) {
    this.projectService.selectedProject = elemento;
    debugger;
    console.log('selectedProject', this.projectService.selectedProject)
    let fechaEntrega = this.fileUtilities.getFormatDate(elemento.FechaEntrega.toString());

    this.serviceLocation.getDepartamentByIdRegion(elemento.CodigoRegion.toString()).subscribe(
      data => {
        this.ListDepartaments = Object.assign(data['Data']);
      }, error => console.log(error));

    this.serviceLocation.getCityByIdDepartament(elemento.CodigoDepartamento.toString()).subscribe(
      data => {
        this.ListCity = Object.assign(data['Data']);
      }, error => console.log(error));

    this.objEditProject.Nombre = elemento.Nombre;
    this.objEditProject.CodigoConstructora = elemento.CodigoConstructora;
    this.objEditProject.FechaEntrega = fechaEntrega;
    this.objEditProject.EstratoInmueble = elemento.EstratoInmueble;
    this.objEditProject.CodigoRegion = elemento.CodigoRegion;
    this.objEditProject.CodigoDepartamento = elemento.CodigoDepartamento;
    this.objEditProject.CodigoCiudad = elemento.CodigoCiudad;
  }

  loadRegions() {
    this.serviceLocation.getAllRegion().subscribe(data => {
      this.ListRegions = Object.assign(data['Data']);
    }, error => console.log(error));
  }

  changeRegion() {
    debugger;
    this.serviceLocation.getDepartamentByIdRegion(this.objEditProject.CodigoRegion.toString()).subscribe(
      data => {
        this.ListDepartaments = Object.assign(data['Data']);
      }, error => console.log(error));
  }

  changeDepartament() {

    this.serviceLocation.getCityByIdDepartament(this.objEditProject.CodigoDepartamento.toString()).subscribe(
      data => {
        this.ListCity = Object.assign(data['Data']);
      }, error => console.log(error));
  }




  onSubmit(inputSearch: NgForm) {

    if (inputSearch.invalid) {
      return;
    }
    this.nombreProyecto = inputSearch.controls['nombreProyecto'].value;
    this.loadDatatable(this.nombreProyecto);
  }

  loadDatatable(nombreProyecto: string) {
    debugger;

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.projectService.getProject(nombreProyecto).subscribe(data => {
        this.lstProject = Object.assign(data['Data']);
        this.dtTrigger.next();
      }, error => console.log(error));

    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  cargarStepper() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
  }

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }
}
