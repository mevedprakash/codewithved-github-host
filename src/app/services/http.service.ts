import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import projects from './../../data/projects.json';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}

  getProjects() {
    console.log(projects);
    return of(projects);
  }
}
