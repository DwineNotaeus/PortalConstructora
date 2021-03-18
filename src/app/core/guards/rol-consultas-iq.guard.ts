import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolConsultasIQGuard implements CanActivate {

  ListaFuncionalidades: {};


  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.authService.getUserToken();


    try {
      
      // if (currentUser) {
      //   debugger;
      //   let decoded = jwt_decode(currentUser);
      //   this.userService.getFuncionalidadesPorRol(decoded['unique_name']).subscribe(response => {
      //     console.log(response)
      //     this.ListaFuncionalidades = Object.assign(response['Data']);

      //     debugger;
      //     for (let i in this.ListaFuncionalidades) {
      //       debugger;
      //       if (RolConsultasIQ.BusquedaPorNroIdentificacion == this.ListaFuncionalidades[i].IdFuncionalidad) {
      //         this.centinela = true;
      //       }
      //       else {
      //         this.centinela = false
      //       }
      //     }
      //     debugger;
      //     if (this.centinela) {
      //       return true;
      //     } else {
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'Oops...',
      //         text: 'Something went wrong!',
      //         // footer: '<a href>Why do I have this issue?</a>'
      //       })
      //       this.router.navigate(["/projects"]);
      //       return false;
      //     }

      //   });
      // }

    } catch (error) {

    }


    return true;
  }

}
