import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { teams } from "./teams";
import { createId } from "../utils";

export const workflowStateTypeEnum = pgEnum("workflow_state_type", [
  "backlog",
  "unstarted",
  "started",
  "completed",
  "cancelled",
]);

export const workflowStates = pgTable("workflow_states", {
  id: text("id").primaryKey().$defaultFn(createId),
  teamId: text("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: workflowStateTypeEnum("type").notNull(),
  color: text("color").notNull().default("#e2e8f0"),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const workflowStatesRelations = relations(workflowStates, ({ one }) => ({
  team: one(teams, {
    fields: [workflowStates.teamId],
    references: [teams.id],
  }),
}));

export type WorkflowState = typeof workflowStates.$inferSelect;
export type NewWorkflowState = typeof workflowStates.$inferInsert;
