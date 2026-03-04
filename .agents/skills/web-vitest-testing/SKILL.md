---
name: web-vitest-testing
description: Specialized skill for unit testing Angular 21 applications with Vitest and @lib/ng-vitest-mocks. Enforces 100% coverage habit.
---

# web-vitest-testing Skill

This skill ensures that all code in `web` is accompanied by high-quality unit tests with 100% coverage, utilizing Vitest and project-specific mocking utilities.

## Core Requirements
- **Vitest**: The primary test runner. Use `/// <reference types="vitest" />` in config files.
- **Zero Lint Policy**: MUST fix all lint errors in test files. Use exceptions ONLY as a final resort.
- **100% Coverage**: Every change must maintain or achieve 100% test coverage for the modified file.
- **Zoneless Testing**: The application is purely zoneless. Use `setupTestBed({ zoneless: true })` from `@lib/ng-vitest-mocks`.
- **No Deprecations**: NEVER use deprecated testing APIs or patterns.
- **TestBed.inject()**: ALWAYS use `TestBed.inject()` or `inject()` for DI in tests.
- **Mocking**: Use `@lib/ng-vitest-mocks` for Components, Directives, Pipes, and Providers.
- **Zoneless**: STRICTLY NO `zone.js`. The application is purely zoneless.
- **Imports**: ALWAYS use absolute path aliases (e.g., `@app/*`, `@lib/*`). NEVER use relative paths.
- **Global Setup**: DO NOT initialize test environment manually. It is handled globally.
- **Global Providers**: ALWAYS use `testProviders` from `@test-providers` when relevant.

## Path Aliases (MANDATORY)
Use `tsconfig` aliases for ALL imports:
- **App**: `@app/*`, `@pages/*`, `@components/*`, `@resources/*`, `@data/*`, `@services/*`, etc.
- **Libs**: `@lib/ui-cdk/*`, `@lib/ng-vitest-mocks`, `@lib/utils`, etc.
- **Test Config**: `@test-providers`, `@test-setup`

## Avoid (MANDATORY)
- ❌ **No Zone.js**: Never use `NgZone`, `zone.run()`, or `async`/`fakeAsync` from `@angular/core/testing` unless necessary for legacy integration. Prefer native `async`/`await`.
- ❌ **No Legacy Decorators in Mocks**: Ensure mock components use `input()` and `output()`.
- ❌ **No Structural Directives in Mocks**: Use native `@if`/`@for` in mock templates if needed.
- ❌ **No Config Changes**: Do not modify `vitest.config.ts` without manual approval.

## Mocking Strategy
Avoid using real dependencies in unit tests. Use the following utilities from `@lib/ng-vitest-mocks`:

- `MockComponent(ComponentClass)`: Mocks a component, preserving its selector and inputs.
- `MockDirective(DirectiveClass)`: Mocks a directive.
- `MockPipe(PipeClass)`: Mocks a pipe.
- `MockProvider(ServiceClass)`: Provides a mocked version of a service using `vitest` spies.

### Example: Testing Signal Inputs
```typescript
const itemSig = signal(mockData);
Object.defineProperty(component, "item", { value: itemSig });
fixture.detectChanges();
```

## Testing Signals
When testing Signal-based components/services:
- Use `signal()`, `computed()`, and `effect()` as needed in the test setup.
- Verify that `computed()` values update correctly when source signals change.
- Use `fixture.detectChanges()` to trigger signal-based updates in templates.
- **Zoneless**: Remember that change detection must be manually triggered via `fixture.detectChanges()` as there is no automatic zone-based polling.

## Verifying Coverage
After running tests, always check the coverage report:
```bash
bun test --coverage
```
Ensure all lines, statements, and branches in the modified files are covered. If coverage is below 100%, identify the missing paths and add corresponding test cases.

## Checklist for Unit Tests
1. [ ] Zero lint errors in test files?
2. [ ] Coverage is 100% for the modified files?
3. [ ] `setupTestBed({ zoneless: true })` is used?
4. [ ] `TestBed.inject()` used instead of constructors or deprecated variants?
5. [ ] All external components/directives/pipes are mocked?
6. [ ] Services/Providers are mocked using `MockProvider`?
7. [ ] Correct `platform-browser/testing` is used?
8. [ ] Used path aliases (`@app/*`, `@lib/*`)?
9. [ ] Signal inputs/outputs/effects are correctly exercised?
10. [ ] Tests pass consistently without flakes in a zoneless environment?
