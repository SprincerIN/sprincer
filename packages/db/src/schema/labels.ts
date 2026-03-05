import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { teams } from "./teams";
import { createId } from "../utils";

export const labels = pgTable("labels", {
  id: text("id").primaryKey().$defaultFn(createId),
  teamId: text("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color").notNull().default("#94a3b8"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const labelsRelations = relations(labels, ({ one }) => ({
  team: one(teams, {
    fields: [labels.teamId],
    references: [teams.id],
  }),
}));

export type Label = typeof labels.$inferSelect;
export type NewLabel = typeof labels.$inferInsert;
