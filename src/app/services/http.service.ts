import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import projects from './../../data/projects.json';

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
  constructor() {}

  getProjects() {
    console.log(projects);
    return of(projects as Project[]);
  }
}
