import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-list.component.html',
//   styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  filters = { status: '', teamMember: '' };
  isAdmin = false;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    // private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.isAdmin = user?.role === 'admin';
      this.loadProjects();
    });
  }

  loadProjects() {
    this.projectService.getProjects(this.filters).subscribe(projects => {
      this.projects = projects;
    });
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
        //   this.toastr.success('Project deleted');
          this.loadProjects();
        },
        error: () => {
            // this.toastr.error('Failed to delete project')
        },
      });
    }
  }
}