import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'getcode',
    component: ProjectsComponent,
  },
  {
    path: 'getcode/:id',
    component: ProjectComponent,
  },
];
