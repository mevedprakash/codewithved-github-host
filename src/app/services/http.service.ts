import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import projectsData from './../../data/projects.json';

export interface Project {
  id?: string;
  name: string;
  youtubeVideoId: string;
  downloadCodeUrl: string;
  rank: number;
  gitCode: string;
}
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  projects!: Project[];
  constructor() {

    var idArr = projectsData.map(function (item) {
      return item.id;
    });
    var isDuplicate = idArr.some(function (item, idx) {
      return idArr.indexOf(item) != idx;
    });
    if(isDuplicate){
      this.projects=[];
      console.error("Duplicate project id")
      return;
    }
    this.projects = projectsData;
    
  }

  getProjects() {
    return of(this.projects);
  }
  getProject(id: string) {
    return of(this.projects.find((x) => x.id == id));
  }
  getSimilarProjects(projectId: string, count: number = 5) {
    let similarProjects = this.projects
      .filter((x) => x.id != projectId)
      .sort((x, y) => x.rank - y.rank)
      .slice(0, count);
    return of(similarProjects);
  }
}
