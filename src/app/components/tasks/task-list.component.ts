import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DragDropModule],
  templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  projectId: string;
  tasks: Task[] = [];
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  isAdmin = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private route: ActivatedRoute,
    // private toastr: ToastrService
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.isAdmin = user?.role === 'admin';
      this.loadTasks();
    });
  }

  loadTasks() {
    this.taskService.getTasks(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
      this.todo = tasks.filter(t => t.status === 'to-do');
      this.inProgress = tasks.filter(t => t.status === 'in-progress');
      this.done = tasks.filter(t => t.status === 'done');
    });
  }

  drop(event: CdkDragDrop<Task[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      task.status = status as 'to-do' | 'in-progress' | 'done';
      this.taskService.updateTask(task._id!, task).subscribe({
        next: () => {
            // this.toastr.success('Task status updated')
        },
        error: () => {},
      });
    }
  }

  deleteTask(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
        //   this.toastr.success('Task deleted');
          this.loadTasks();
        },
        error: () => {},
      });
    }
  }
}