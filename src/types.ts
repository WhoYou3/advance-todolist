export interface Theme {
  themeValue: boolean;
}

export interface UserTasksData {
  boards: Boards[] | null;
  tasks: TasksStatus | null;
}

interface Boards {
  title: string;
}

interface TasksStatus {
  notStartYetTasks: Task[];
  pendingTasks: Task[];
  doneTasks: Task[];
}

interface Task {
  title: string;
  description: string;
  subTasks?: string[];
}
