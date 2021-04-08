import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { searchByProject } from 'src/app/core/models/projects.model';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Component({
  selector: 'app-search-by-document',
  templateUrl: './search-by-document.component.html',
  styleUrls: ['./search-by-document.component.css']
})
export class SearchByDocumentComponent implements OnInit, OnDestroy, AfterViewInit {


  public nroIdentificacion: string;
  lstByDocument: [];
  public ProjectsModel: searchByProject;

  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;

  constructor(private projectService: ProjectsService, private serviceUtilities: UtilitiesService) {
    this.ProjectsModel = new searchByProject();
  }

  ngOnInit(): void {
    this.dtOptions = this.serviceUtilities.optionsDatatable();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }



  onSubmit(inputSearch: NgForm) {
    if (inputSearch.invalid) {
      return;
    }

    this.nroIdentificacion = inputSearch.controls['nroIdentificacion'].value;
    this.loadDatatable(this.nroIdentificacion);
  }


  loadDatatable(nroIdentificacion: string) {
    if (nroIdentificacion !== '') {


      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();

        this.projectService.getDataByidentificationNumber(nroIdentificacion).subscribe(data => {
          this.lstByDocument = Object.assign(data['Data']);
          this.dtTrigger.next();
        }, error => console.log(error));


      });
    }

  }


  gridDetailsProject(item: searchByProject) {
    console.log('item', item)
    this.ProjectsModel.RadicadoBanco = item.RadicadoBanco;

    this.ProjectsModel.DetalleObservacion = item.DetalleObservacion;
    this.ProjectsModel.Novedad = item.Novedad;
    this.ProjectsModel.Evaluate = item.Evaluate;
    this.ProjectsModel.Registration = item.Registration;
    this.ProjectsModel.DeliveryCertificate = item.DeliveryCertificate;
    this.ProjectsModel.Approval = item.Approval;
    this.ProjectsModel.Ratification = item.Ratification;
    this.ProjectsModel.Other = item.Other;
    this.ProjectsModel.DocumentRoute = item.DocumentRoute;
    this.ProjectsModel.ApprovalDocumentName = item.ApprovalDocumentName;

  }


  openFileUploadDiolog(docType: string, projectsModel: searchByProject, status: string, docName: string) {
  }







}
