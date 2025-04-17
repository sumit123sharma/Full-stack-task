export interface Project {
    _id?: string;
    name: string;
    description: string;
    startDate: Date;
    dueDate: Date;
    status: 'open' | 'in-progress' | 'completed';
    teamMembers: string[];
  }