import { Component, inject, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';
import { Project } from '../../services/http.service';

@Component({
  selector: 'app-project-card',
  imports: [MatButtonModule,MatCardModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
@Input() project!:Project;
 sanitizer= inject(DomSanitizer);
}
