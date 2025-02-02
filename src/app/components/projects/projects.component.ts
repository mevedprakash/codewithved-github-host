import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectCardComponent } from '../project-card/project-card.component';
@Component({
  selector: 'app-projects',
  imports: [ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: any[] = [];
  httpService=inject(HttpService)
  sanitizer= inject(DomSanitizer);
  ngOnInit(){
    this.httpService.getProjects().subscribe(result=>{
      this.projects = result;
    })
  }
}
