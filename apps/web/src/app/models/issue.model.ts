export type IssuePriority = "no_priority" | "urgent" | "high" | "medium" | "low";

export interface Issue {
  id: string;
  teamId: string;
  sequenceNumber: number;
  title: string;
  description?: unknown; // BlockNote JSON
  statusId?: string;
  priority: IssuePriority;
  assigneeId?: string;
  estimate?: number;
  dueDate?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}
