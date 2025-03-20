import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import projectsData from './../../data/projects.json';
import configData from './../../data/config.json';
export interface Project {
  id?: string;
  name: string;
  youtubeVideoId: string;
  youtubePlayListUrl?: string;
  downloadCodeUrl: string;
  isFree?:boolean;
  rank: number;
  gitCodeUrl: string;
  techStack?: string[];
}
export interface IConfig{
  blockProjectPurchase:boolean
}
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  projects!: Project[];
  config!:IConfig;
  constructor() {
    this.config= configData;
    var isDuplicate = this.isDuplicateProjectKey();
    if (isDuplicate) {
      this.projects = [];
      console.error('Duplicate project id');
      return;
    }
    
    this.projects = projectsData.sort((a, b) => a.rank - b.rank);
    if(this.config.blockProjectPurchase){
      this.projects = this.projects.map(x=> {
        x.downloadCodeUrl = ''
        return x;
      });
    }
  }

  private isDuplicateProjectKey() {
    var idArr = projectsData.map(function (item) {
      return item.id;
    });
    var isDuplicate = idArr.some(function (item, idx) {
      return idArr.indexOf(item) != idx;
    });
    return isDuplicate;
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
