import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { LoginComponent } from './auth/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { ProjectListComponent } from './components/projects/project-list.component';
import { ProjectFormComponent } from './components/projects/project-form.component';
import { TaskListComponent } from './components/tasks/task-list.component';
import { TaskFormComponent } from './components/tasks/task-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [() => inject(AuthService).user$.pipe(map(user => !!user))],
  },
  {
    path: 'projects',
    component: ProjectListComponent,
    canActivate: [() => inject(AuthService).user$.pipe(map(user => !!user))],
  },
  {
    path: 'projects/new',
    component: ProjectFormComponent,
    // canActivate: [() => inject(AuthService).user$.pipe(map(user => user?.role === 'admin'))],
  },
  {
    path: 'projects/edit/:id',
    component: ProjectFormComponent,
    canActivate: [() => inject(AuthService).user$.pipe(map(user => user?.role === 'admin'))],
  },
  {
    path: 'projects/:projectId/tasks',
    component: TaskListComponent,
    canActivate: [() => inject(AuthService).user$.pipe(map(user => !!user))],
  },
  {
    path: 'projects/:projectId/tasks/new',
    component: TaskFormComponent,
    canActivate: [() => inject(AuthService).user$.pipe(map(user => user?.role === 'admin'))],
  },
  {
    path: 'projects/:projectId/tasks/edit/:id',
    component: TaskFormComponent,
    canActivate: [() => inject(AuthService).user$.pipe(map(user => user?.role === 'admin'))],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];