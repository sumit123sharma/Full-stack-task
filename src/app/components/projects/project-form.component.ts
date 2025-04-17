import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-form.component.html',
//   styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  project: Project = {
    name: '',
    description: '',
    startDate: new Date(),
    dueDate: new Date(),
    status: 'open',
    teamMembers: [],
  };
  isEdit = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    // private toastr: ToastrService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.projectService.getProject(id).subscribe(project => {
        this.project = project;
      });
    }
  }

  save() {
    const action = this.isEdit
      ? this.projectService.updateProject(this.project._id!, this.project)
      : this.projectService.createProject(this.project);

    action.subscribe({
      next: () => {
        // this.toastr.success(`Project ${this.isEdit ? 'updated' : 'created'}`);
        this.router.navigate(['/projects']);
      },
      error: () => {
        // this.toastr.error('Failed to save project')
    },
    });
  }
}