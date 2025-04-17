import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
//   styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    projectId: '',
    title: '',
    description: '',
    assignedUser: '',
    priority: 'low',
    status: 'to-do',
    dueDate: new Date(),
  };
  isEdit = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.task.projectId = this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.taskService.getTasks(this.task.projectId).subscribe(tasks => {
        this.task = tasks.find(t => t._id === id)!;
      });
    }
  }

  save() {
    const action = this.isEdit
      ? this.taskService.updateTask(this.task._id!, this.task)
      : this.taskService.createTask(this.task);

    action.subscribe({
      next: () => {
        this.toastr.success(`Task ${this.isEdit ? 'updated' : 'created'}`);
        this.router.navigate([`/projects/${this.task.projectId}/tasks`]);
      },
      error: () => this.toastr.error('Failed to save task'),
    });
  }
}