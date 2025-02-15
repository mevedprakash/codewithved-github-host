import { Component, inject } from '@angular/core';
import { HttpService, Project } from '../../services/http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, map } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-projects',
  imports: [
    ProjectCardComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    MatSelectModule,
    MatPaginatorModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [];
  httpService = inject(HttpService);
  sanitizer = inject(DomSanitizer);
  route = inject(ActivatedRoute);
  router = inject(Router);
  searchControl = new FormControl('');
  filteredProjects: Project[] = [];
  typeControl = new FormControl('');
  filter: any = { page: 0, pageSize: 6 };
  filterProjectsLength!:number;
    analyticsService = inject(AnalyticsService);
  ngOnInit() {
    this.route.queryParamMap.subscribe((result: any) => {
      let id = result.params.id;
      if (id) {
        if(window.location.href.includes("/getcode")){
          this.analyticsService.trackEvent("FromGetCodeLink",id)
        }
        this.router.navigateByUrl('/project/' + id);
      }
    });

    this.httpService.getProjects().subscribe((result) => {
      this.projects = this.filteredProjects = result;
    });
    this.searchControl.valueChanges
      .pipe(debounceTime(250))
      .subscribe((search: string | null) => {
        console.log(search);
        this.filter.search = search;
        this.filterProjects();
      });
    this.typeControl.valueChanges.subscribe((type: any) => {
      console.log(type);
      this.filter.type = type;
      this.filterProjects();
    });

    this.filterProjects();
  }

  handlePageEvent(event: any) {
    console.log(event);
    this.filter.page = event.pageIndex;
    this.filterProjects();
  }
  private filterProjects() {
    let filtered = [...this.projects];
    if (this.filter.search) {
      filtered = this.projects.filter(
        (x) =>
          x.name
            .toLowerCase()
            .includes((this.filter.search || '').toLowerCase()) ||
          x.techStack?.find((y) =>
            y.toLowerCase().includes((this.filter.search || '').toLowerCase())
          )
      );
    }
    if (this.filter.type) {
      filtered = filtered.filter(
        (x) =>
          (this.filter.type == 'paid' && x.downloadCodeUrl) ||
          (this.filter.type == 'free' && !x.downloadCodeUrl)
      );
    }
    this.filterProjectsLength= filtered.length;
    filtered = filtered.slice(
      this.filter.page * this.filter.pageSize,
      (this.filter.page + 1) * this.filter.pageSize
    );
    this.filteredProjects = filtered;
  }
}
