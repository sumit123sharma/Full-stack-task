import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  tasks: Task[] = [];
  upcomingDeadlines: Task[] = [];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });

    this.taskService.getTasks('').subscribe(tasks => {
      this.tasks = tasks;
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      this.upcomingDeadlines = tasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate <= nextWeek;
      });
    });
  }

  getProjectSummary() {
    return {
      open: this.projects.filter(p => p.status === 'open').length,
      inProgress: this.projects.filter(p => p.status === 'in-progress').length,
      completed: this.projects.filter(p => p.status === 'completed').length,
    };
  }

  getTaskSummary() {
    return {
      todo: this.tasks.filter(t => t.status === 'to-do').length,
      inProgress: this.tasks.filter(t => t.status === 'in-progress').length,
      done: this.tasks.filter(t => t.status === 'done').length,
    };
  }
}