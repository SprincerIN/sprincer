---
name: web-angular-21
description: Specialized skill for developing with Angular 21, Zoneless, Signals, and NgRx Signal Store in the web application.
---

# web-angular-21 Developer Skill

This skill ensures adherence to the high-performance, modern Angular 21 architecture used in `web`.

## Core Principles
- **Angular 21**: All code must target Angular 21. Standalone components only.
- **Zero Lint Policy**: MUST fix all lint errors (Biome, TS, Angular). Use exceptions ONLY as a final resort for unsolvable issues and document why.
- **No Deprecations**: NEVER use deprecated APIs or patterns (e.g., constructor injection, legacy decorators).
- **Zoneless**: No Zone.js dependencies. Use `provideZonelessChangeDetection()`. No `NgZone`.
- **Signals-First**: Use Signals for all UI state management (`signal`, `computed`, `effect`).
- **Modern DI**: ALWAYS use the `inject()` function. Constructor injection is strictly forbidden.
- **OnPush Always**: Every component, page, and dialog MUST use `ChangeDetectionStrategy.OnPush`.
- **Inline Only**: Templates and styles MUST be inline. No external `.html` or `.css` files.
- **Native Control Flow**: Use `@if`, `@for`, `@switch` ONLY. Legacy `*ngIf`/`*ngFor` are forbidden.
- **UI Architecture**: ALWAYS prefer base building blocks from `@libs/ui-cdk`.

## Blueprint Specifications

### 1. Pages
- Path: `pages/{name}/{name}.page.ts`
- Must have `index.ts` with `export { default } from "./{name}.page";`.
- Selector: `bd-{name}-page`.
- Change Detection: `OnPush`.
- Registration: MUST add to both `app.routes.ts` and `app.routes.server.ts`.

### 2. Components
- Path: `components/{name}/{name}.component.ts`.
- Selector: `bd-{name}`.
- Data Binding: Use `input()` and `output()` functions, NOT `@Input()` or `@Output()`.
- Queries: Use `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()`.
- Host Bindings: Use the `host` property in `@Component`/`@Directive` decorator. No `@HostBinding` or `@HostListener`.
- Export: Named export only.

### 3. Data Layers
- **Resources**: Centralize fetching in `resources/`. Use `use{Domain}Query` and `use{Action}Mutation`.
- **Context Stores**: Use `signalStore` from `@ngrx/signals` for shared state. Filename suffix: `.store.ts`.

## Path Aliases (MANDATORY)
Use the following aliases instead of relative paths:
- **App**: `@app/*`, `@pages/*`, `@components/*`, `@resources/*`, `@data/*`, `@dialogs/*`, `@guards/*`, `@services/*`, `@interceptors/*`, `@pipes/*`, `@directives/*`, `@models/*`, `@interfaces/*`, `@api/*`
- **Libs**: `@lib/ui-cdk/*`, `@lib/utils`, `@lib/middleware`, `@lib/interfaces`, `@lib/config`, `@lib/ng-vitest-mocks`

## Forbidden Patterns
- ❌ **No Zone.js**: Never use `NgZone` or `zone.run()`.
- ❌ **No Legacy Decorators**: `@Input`, `@Output`, `@ViewChild`, `@ContentChild`, `@HostBinding`, `@HostListener`.
- ❌ **No Constructor Injection**: Use `inject()` instead.
- ❌ **No Template-Driven Forms**: Use **Reactive Forms** only.
- ❌ **No Legacy Control Flow**: `*ngIf`, `*ngFor`, `*ngSwitch`.
- ❌ **No ngClass/ngStyle**: Use `[class.name]` or `[style.prop]` bindings.
- ❌ **No RxJS for State**: Subjects/Observables are for HTTP layer only.
- ❌ **No Classic NgRx**: Do not use `@ngrx/store` or `@ngrx/effects`.
- ❌ **No Relative Imports**: strict usage of `@app/` or `@lib/` aliases.

## Checklist
1. [ ] Zero lint errors remaining?
2. [ ] No deprecated APIs or decorators used?
3. [ ] `inject()` used instead of constructors?
4. [ ] Signal-based inputs/outputs/queries?
5. [ ] Native `@if`/`@for` control flow?
6. [ ] Standalone + OnPush + Inline template/styles?
7. [ ] Used `host` property for host bindings?
8. [ ] Routing added to BOTH client and server route files?
9. [ ] Barrels (`index.ts`) updated?
10. [ ] Used `@libs/ui-cdk` building blocks?
