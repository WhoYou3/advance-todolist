export interface Theme {
  themeValue: boolean;
}

export interface UserTasksData {
  boards: Boards[] | null;
}

interface Boards {
  title: string | undefined;
  tasks: TasksStatus | null;
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
