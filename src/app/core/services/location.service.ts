import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _http: HttpClient) { }

  getAllRegion(): Observable<any> {
    return this._http.get(`${environment.urlApi}ProjectDetails/GetRegion`);
  }

  getDepartamentByIdRegion(value: string): Observable<any> {
    let formData = new FormData();
    formData.append('txtIdRegion', value);
    return this._http.post(`${environment.urlApi}ProjectDetails/GetDepartamento`, formData);
  }

  getCityByIdDepartament(value: string): Observable<any> {
    let formData = new FormData();
    formData.append('txtIdDepartamento', value);
    return this._http.post(`${environment.urlApi}ProjectDetails/GetCiudad`, formData);
  }




}
