import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstructorService {

  constructor(private _http: HttpClient) { }

  getAllConstructorList(): Observable<any>{
    return this._http.get(`${environment.urlApi}ProjectDetails/getAllConstructor`);
  }


}
