import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin, UserToken } from '../models/user.model';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public roleId: number;

  constructor(private _http: HttpClient) {
  }

  login(userLogin: UserLogin) {
    return this._http.post(`${environment.urlApi}Authentication/UserLogin`, userLogin);
  }

  getTokenAPI(UserName: string) {
    return this._http.post(`${environment.urlApi}User/getAuthorize`, UserName);
  }

  getFuncionalidadesPorRol() {
    return this._http.get(`${environment.urlApi}User/getFuncionalidadesPorRol`);
  }

  setUserLoggedIn(data: any) {
    localStorage.setItem("userToken", data); //auth_token
    // localStorage.setItem("validate", "true");
  }

  getUserToken(): UserToken {
    return localStorage.userToken;
  }

  decodificarToken(){
    var token = localStorage.userToken;
    var decoded = jwt_decode(token);
    if (decoded != undefined) {
      return this.roleId = decoded['role']
    }
  }

  getUserNameLoggedIn() {
    return this._http.get(`${environment.urlApi}User/postGetUser`);
  }

}