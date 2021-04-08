import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/core/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MsalService } from '@azure/msal-angular';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UserLogin;
  public siteKey: string;
  isLoggedIn: boolean = false;
  userData: any;

  constructor(private authService: AuthService, private msalService: MsalService, private router: Router) {
    this.user = new UserLogin();
    
  }

  ngOnInit(): void {
    this.siteKey = environment.keyCaptcha;
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: any): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  onSubmit(form: NgForm) {


    if (this.isLoggedIn) {
      this.msalService.logout();
    } else {
      this.msalService
        .loginPopup()
        .then((result) => {

          console.log("Login success: ", result);

          let EstadoUsuario = result.idTokenClaims['state'];
          let usuarioB2C = result.idTokenClaims['family_name'];

          let tokenB2C = result.idToken['rawIdToken'];

          this.getTokenFromAPI(usuarioB2C, EstadoUsuario);

        })
        .catch((err) => {
          console.log("Login failed : ", JSON.stringify(err));
        });
    }
    // console.log('Credenciales de usuario', form.value);
    // if (form.invalid) {
    //   return;
    // }
    // let isValidCaptcha = true;
    // /* 
    //     ::::::::::::::::::::::: 
    //     ::: Validar captcha ::: 
    //     ::::::::::::::::::::::: 
    // */
    // if (!isValidCaptcha) { return; }
    // this.login();
  }

  getTokenFromAPI(usuarioB2C: string, EstadoUsuario: string) {
    debugger;
    if (EstadoUsuario) {

      this.authService.getTokenAPI(usuarioB2C).subscribe(response => {

        this.userData = response;
        if (this.userData.Data.key == "99") {
          let decoded = jwt_decode(this.userData.Data.value);
          
          console.log('decoded', decoded['unique_name']);
          
          if (decoded != undefined) {
            debugger;
            if (decoded['unique_name'] == usuarioB2C) {

              // const userToken: UserToken = data.result.authToken;
              // userToken.active_status = userToken.active_status ?? false;
              // localStorage.setItem("prw_user", JSON.stringify(userToken));

              this.authService.setUserLoggedIn(this.userData.Data.value);
              this.validateRole(decoded['role']);
            }
          }
        }

      });

    }
  }

  validateRole(role: string) {
    switch (role) {
      case "1": {
        //statements; 
        break;
      }
      case "4": {
        this.router.navigate([""]);
        break;
      }
      case "8": {
        //statements; 
        break;
      }
      case "9": {
        //statements; 
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }


  login() {
    this.authService.login(this.user).subscribe(
			async (data) => {
        // Procesar respuesta (data) y almacenar token en localStorage        
			},
			(error) => {
				console.log("error", error);
        // Procesar mensaje de error (SweetAlert2)
			}
		);
  }

}
