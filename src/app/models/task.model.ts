export interface Task {
    _id?: string;
    projectId: string;
    title: string;
    description: string;
    assignedUser: string;
    priority: 'low' | 'medium' | 'high';
    status: 'to-do' | 'in-progress' | 'done';
    dueDate: Date;
  }