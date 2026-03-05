import { integer, jsonb, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { teams } from "./teams";
import { workflowStates } from "./workflow-states";
import { users } from "./users";
import { createId } from "../utils";

export const issuePriorityEnum = pgEnum("issue_priority", [
  "no_priority",
  "urgent",
  "high",
  "medium",
  "low",
]);

export const issues = pgTable("issues", {
  id: text("id").primaryKey().$defaultFn(createId),
  teamId: text("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  // Team-scoped sequence number (e.g. ENG-42) — set via trigger or application logic
  sequenceNumber: serial("sequence_number").notNull(),
  title: text("title").notNull(),
  // BlockNote JSON stored as JSONB
  description: jsonb("description"),
  statusId: text("status_id").references(() => workflowStates.id, {
    onDelete: "set null",
  }),
  priority: issuePriorityEnum("priority").notNull().default("no_priority"),
  assigneeId: text("assignee_id").references(() => users.id, { onDelete: "set null" }),
  estimate: integer("estimate"),
  dueDate: timestamp("due_date", { withTimezone: true }),
  parentId: text("parent_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const issuesRelations = relations(issues, ({ one, many }) => ({
  team: one(teams, {
    fields: [issues.teamId],
    references: [teams.id],
  }),
  status: one(workflowStates, {
    fields: [issues.statusId],
    references: [workflowStates.id],
  }),
  assignee: one(users, {
    fields: [issues.assigneeId],
    references: [users.id],
  }),
  parent: one(issues, {
    fields: [issues.parentId],
    references: [issues.id],
    relationName: "subIssues",
  }),
  subIssues: many(issues, { relationName: "subIssues" }),
}));

export type Issue = typeof issues.$inferSelect;
export type NewIssue = typeof issues.$inferInsert;
