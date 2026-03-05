import { Elysia } from "elysia";

export const wikiRoutes = new Elysia({ prefix: "/internal/v1/wiki" })
  .get("/spaces", () => {
    // TODO: List wiki spaces
    return { spaces: [] };
  })
  .get("/pages", () => {
    // TODO: List wiki pages
    return { pages: [] };
  })
  .get("/pages/:pageId", ({ params }) => {
    // TODO: Get wiki page
    return { page: null, pageId: params.pageId };
  });
