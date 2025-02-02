import { Component, inject } from '@angular/core';
import { HttpService, Project } from '../../services/http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  imports: [
    ProjectCardComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [];
  httpService = inject(HttpService);
  sanitizer = inject(DomSanitizer);

  searchControl = new FormControl('');
  filteredProjects: Project[] = [];
  ngOnInit() {
    this.httpService.getProjects().subscribe((result) => {
      this.projects = this.filteredProjects = result;
    });
    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((search: string | null) => {
      console.log(search);
      this.filteredProjects = this.projects.filter((x) =>
        x.name.toLowerCase().includes((search || '').toLowerCase())
      );
    });
  }
}
