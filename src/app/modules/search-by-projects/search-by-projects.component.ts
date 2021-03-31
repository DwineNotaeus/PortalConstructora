import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FileUtilities } from 'src/app/core/models/file-utilities';
import { Projects, ProjectsIds, searchByProject } from 'src/app/core/models/projects.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';


@Component({
  selector: 'app-search-by-projects',
  templateUrl: './search-by-projects.component.html',
  styleUrls: ['./search-by-projects.component.css']
})
export class SearchByProjectsComponent implements OnInit, OnDestroy, AfterViewInit {

  public isAll: boolean;
  public showFilter = true;
  public dropdownSettings = {};
  public dropdownList: any[];
  public LstProjectsxUser: any[];
  public LstCodigoProyectos = [];
  public selectedItems: ProjectsIds[];

  public ProjectsModel: searchByProject;
  public roleId: number;
  public rutaimagen: string = "";
  private fileup: FileUtilities;

  public uploadedFiles: Array<File>;


  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(private serviceAuth: AuthService, private serviceProjects: ProjectsService, private serviceUtilities: UtilitiesService) {
    this.ProjectsModel = new searchByProject();
  }

  ngOnInit(): void {
    this.configurarMultiSelect();
    this.loadDropdownList();
    this.optionsDatatable();

  }

  onUpload() {

    let formData = new FormData();

    for (let index = 0; index < this.uploadedFiles.length; index++) {
      formData.append("uploads[]", this.uploadedFiles[index], this.uploadedFiles[index].name);
    }

    this.serviceProjects.saveDocument(formData).subscribe(data => {
      console.log('Response', data)
    },
      error => { console.log(error); }
    );

  }

  onFileChange(e) {
    this.uploadedFiles = e.target.files;

    console.log('onFileChange', e);
  }

  optionsDatatable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7,
      // serverSide: true,
      // processing: true
      // paging: true,
      // searching: false,
      // destroy: true,
      lengthChange: false
    };
  }

  configurarMultiSelect() {
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
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

  consultProjectsByUser() {

    this.LstCodigoProyectos = [];
    let search = this.dropdownProperties();

    search.selectedValue.forEach(element => {
      this.LstCodigoProyectos.push(element.codigo)
    });

    if (search.Isvalidate) {

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();

        this.serviceProjects.getListProjectsByUser(this.LstCodigoProyectos, this.isAll).subscribe(response => {
          this.LstProjectsxUser = Object.assign(response['Data']);
          console.log('LstProjectsxUser', this.LstProjectsxUser);
          this.dtTrigger.next();
        }, error => { console.log(error) });

      });

    }
  }


  gridDetailsProject(item: searchByProject) {
    debugger;
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
    alert('ok');
    debugger;

    if (this.roleId == 1 || this.roleId == 2 || this.roleId == 4) {



      if (status == 'PENDIENTE') {



        if (docType == 'Otros') {

        }
        /* si es aprobacion o ratificacion, debe ser rol 2 o 4 pra poder subir documentos*/
        this.roleId = this.serviceAuth.decodificarToken();
        if (docName == 'Approval' || docName == 'Ratification') {
          if (this.roleId == 2 || this.roleId == 4) {
            // TO DO: Mensajes del portal
          }
        }
        else {
          // TO DO: Mensajes del portal
        }
      } else {

        if (status != 'PENDIENTE') {
          if (docName == 'Ratification') {
            this.rutaimagen = projectsModel.DocumentRoute + '/Ratificación/' + projectsModel.ApprovalDocumentName;
          }

          if (docName == 'Approval') {
            this.rutaimagen = projectsModel.DocumentRoute + '/Aprobación/' + projectsModel.ApprovalDocumentName;
          }
        }

        if (docName == 'Approval' || docName == 'Ratification') {

          var formData = new FormData();
          formData.append('fileurl', this.rutaimagen);
          this.serviceUtilities.getBase64FromUrl(formData).subscribe(data => {
            this.fileup.downloadFile(data, this.rutaimagen);
          });
        }

      }

    }
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
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

}
