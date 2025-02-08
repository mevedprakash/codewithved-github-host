import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';
import { Project } from '../../services/http.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() showYoutubeVideo:boolean = false;
  @Input() showAction:boolean = true;
  
  sanitizer = inject(DomSanitizer);
}
