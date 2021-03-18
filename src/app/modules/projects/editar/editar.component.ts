import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Subject } from 'rxjs';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnDestroy, OnInit {

  public dtOptions: DataTables.Settings = {};
  private stepper: Stepper;
  lstProjects: any[] = [];

  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(private projectService: ProjectsService) {
  }


  ngOnInit(): void {
    debugger;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthChange: false    
    };
    this.cargarDT();
    this.cargarStepper();


  }

  cargarDT() {

    this.projectService.getAllProjects().subscribe(data => {
      this.lstProjects = Object.assign(data['Data']);
      console.log('lstProjects', this.lstProjects)
      this.dtTrigger.next();
    });

  }

  cargarStepper(){
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  onSubmit() {
    return false;
  }

}
