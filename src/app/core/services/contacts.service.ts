import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private _http: HttpClient) { }


  getListContactsByProject(data: FormData){    
    return this._http.post(`${environment.urlApi}ProjectDetails/GetListContactsForProjects`, data);
  }

  getListContacts(data: FormData) {
    debugger;
    return this._http.post(`${environment.urlApi}ProjectDetails/GetListContacts`, data);
  }


}
