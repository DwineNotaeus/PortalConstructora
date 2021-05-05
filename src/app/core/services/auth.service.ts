import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin, UserToken } from '../models/user.model';
import jwt_decode from "jwt-decode";
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public roleId: number;

  constructor(private _http: HttpClient) {
  }

  login(userLogin: UserLogin) {
    debugger;
    return this._http.post(`${environment.urlApiNew}Authentication/AuthLogin`, userLogin);
  }

  getTokenAPI(UserName: string) {
    debugger;
    //Establecemos cabeceras
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${environment.urlApiNew}WeatherForecast`, UserName);
  }

  // getTokenAPI(UserName: string) {
  //   //Establecemos cabeceras
  //   // let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this._http.post(`${environment.urlApiNew}Authentication/`, UserName);
  // }

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

  // validateCaptcha(): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		this.recaptchaV3Service.execute('login').subscribe(
	// 			(token) => {
	// 				resolve(token);
	// 			},
	// 			(err) => {
	// 				console.error('captcha', err);
	// 				reject(err);
	// 			}
	// 		);
	// 	});
	// }

}