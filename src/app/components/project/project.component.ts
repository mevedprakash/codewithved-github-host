import { Component, inject } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { HttpService, Project } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [ProjectCardComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  httpService = inject(HttpService);
  project!: Project | undefined;
  route = inject(ActivatedRoute);
  similarProjects!: Project[];
  ngOnInit() {
   this.route.params.subscribe(result=>{
    console.log(result);
    this.initPage(result["id"]);
   })
    
  }
  initPage(projectId:string){
    console.log(projectId);
    this.httpService.getProject(projectId).subscribe((result) => {
      this.project = result;
    });
    this.httpService.getSimilarProjects(projectId,3).subscribe((result) => {
      this.similarProjects = result;
    });
  }
}
