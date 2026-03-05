/**
 * Seed script — populates a demo workspace for local development.
 * Run with: bun run db:seed (from packages/db)
 */
import { db } from "./index";
import { users, workspaces, workspaceMembers, teams, teamMembers, workflowStates } from "./schema";

async function seed() {
  console.log("Seeding database...");

  // Demo user
  const [user] = await db
    .insert(users)
    .values({
      email: "demo@sprincer.dev",
      name: "Demo User",
      username: "demo",
    })
    .returning();

  if (!user) throw new Error("Failed to create demo user");
  console.log("Created user:", user.email);

  // Demo workspace
  const [workspace] = await db
    .insert(workspaces)
    .values({
      name: "Acme Corp",
      slug: "acme",
    })
    .returning();

  if (!workspace) throw new Error("Failed to create demo workspace");
  console.log("Created workspace:", workspace.slug);

  // Add user as owner
  await db.insert(workspaceMembers).values({
    workspaceId: workspace.id,
    userId: user.id,
    role: "owner",
  });

  // Demo team
  const [team] = await db
    .insert(teams)
    .values({
      workspaceId: workspace.id,
      name: "Engineering",
      identifier: "ENG",
      color: "#6366f1",
    })
    .returning();

  if (!team) throw new Error("Failed to create demo team");
  console.log("Created team:", team.identifier);

  // Add user to team
  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: "lead",
  });

  // Default workflow states
  const states = [
    { name: "Backlog", type: "backlog" as const, color: "#94a3b8", position: 0 },
    { name: "Todo", type: "unstarted" as const, color: "#64748b", position: 1 },
    { name: "In Progress", type: "started" as const, color: "#6366f1", position: 2 },
    { name: "In Review", type: "started" as const, color: "#8b5cf6", position: 3 },
    { name: "Done", type: "completed" as const, color: "#22c55e", position: 4 },
    { name: "Cancelled", type: "cancelled" as const, color: "#ef4444", position: 5 },
  ];

  await db.insert(workflowStates).values(
    states.map((s) => ({ ...s, teamId: team.id })),
  );

  console.log("Created workflow states:", states.map((s) => s.name).join(", "));
  console.log("\nSeed complete.");
}

seed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
