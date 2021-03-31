import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FuncionalidadesPorRol } from 'src/app/core/models/funcionalidades-por-rol.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userName: string;
  public MenuItem: FuncionalidadesPorRol[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
    });


    this.getMenu();
    this.getUserNameLoggedIn();
  }

  expandDynamicMenu(elemento: any) {
    elemento.expanded = false;
    elemento.expanded = !elemento.expanded;    
  }


  getMenu() {
    this.authService.getFuncionalidadesPorRol().subscribe(response => {
      this.MenuItem = Object.assign(response['Data']);
    });
  }

  getUserNameLoggedIn() {
    this.authService.getUserNameLoggedIn().subscribe(response => {
      this.userName = Object.assign(response);
    });
  }

}
