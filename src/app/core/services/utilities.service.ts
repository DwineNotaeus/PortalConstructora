import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public dtOptions: DataTables.Settings = {};

  constructor(private _http: HttpClient) { }

  getBase64FromUrl(data: FormData) {
    return this._http.post(`${environment.urlApi}ProjectDetails/GetBase64FromUrl`, data);
  }

  optionsDatatable() {
    return this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      paging: false,
      searching: false,
      // destroy: true,
      // lengthChange: false,
      language: { url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json' }
    };
  }


}
