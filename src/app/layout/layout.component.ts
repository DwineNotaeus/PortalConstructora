import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ResponsiveService } from '../core/services/responsive.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  private bIsLoggedIn: boolean;

  constructor(private router: Router, private responsiveService: ResponsiveService, private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.responsiveService.getMobileStatus().subscribe(isMobile => {
    //   if (isMobile) {
    //     console.log('Mobile device detected')
    //   }
    //   else {
    //     console.log('Desktop detected')
    //   }
    // });
    this.onResize();
    debugger;








    // this.isLoggedIn();    
  }

  // isLoggedIn(){

  //   const userToken = this.authService.getUserToken();
  //   try {
  //     if (userToken) {
  //       this.bIsLoggedIn = true;
  //     } else {
  //       this.bIsLoggedIn = false;
  //       this.router.navigate(["/login"]);
  //       return false;
  //     }
  //   } catch (error) {
  //     this.router.navigate(["/login"]);
  //     return false;
  //   }

  // }


  onResize() {
    this.responsiveService.checkWidth();
  }

}
