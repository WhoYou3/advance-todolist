export interface Theme {
  themeValue: boolean;
}

export interface UserTasksData {
  boards: Board[] | null;
}

export interface Board {
  title: string | undefined;
  tasks: TasksStatus | null;
}

export interface TasksStatus {
  notStartYetTasks: Task[];
  pendingTasks: Task[];
  doneTasks: Task[];
}

export interface Task {
  title: string;
  description: string;
  subTasks: string[];
}
