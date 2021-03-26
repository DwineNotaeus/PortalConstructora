import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { contactsByProject, Projects, ProjectsIds } from '../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  public selectedProject: any = {};

  constructor(private _http: HttpClient) {
  }

  getProjectByUser() {
    return this._http.get(`${environment.urlApi}ProjectDetails/ProjectsForUser`);
  }

  getListProjectsByUser(projectId: number[], isAll: boolean) {
    let modelo = new ProjectsIds();
    modelo.isAll = isAll;
    modelo.projectsCode = projectId;

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(modelo)
    return this._http.post(`${environment.urlApi}ProjectDetails/GetClientForCunstructor`, body, { 'headers': headers });
  }

  getAllProjects(): Observable<Projects> {
    return this._http.get<Projects>(`${environment.urlApi}ProjectDetails/GetAllProjectsForUser`);
  }

  createProject(proyecto: Projects, contacto: contactsByProject): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = { proyecto, contacto }
    return this._http.post(`${environment.urlApi}ProjectDetails/CreateProject`, body, { 'headers': headers });
  }

  getProject(inputSearch: string) {
    // let NombreProyecto = inputSearch.controls['nombreProyecto'].value;
    var formData = new FormData();
    formData.append('txtNombreProyecto', inputSearch);
    return this._http.post(`${environment.urlApi}ProjectDetails/getProjectCoincidence`, formData);
  }


  saveDocument(data: FormData) {
    // const headers = { 'content-type': 'application/json' }
    // return this._http.post(`${environment.urlApi}SupportDocumentDetails/SaveSupportedDocs`, data, { 'headers': headers });
    return this._http.post(`${environment.urlApi}SupportDocumentDetails/SaveSupportedDocs`, data);
  }


  getDataByidentificationNumber(inputSearch: string) { 
    var formData = new FormData();
    formData.append('identificationNumber', inputSearch);   
    return this._http.post(`${environment.urlApi}ProjectDetails/GetByIdentificationNumber`, formData);
  }



}
