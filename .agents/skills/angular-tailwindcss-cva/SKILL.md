---
name: angular-tailwindcss-cva
description: Guidelines for building reusable Angular 21 UI components using Tailwind CSS and class-variance-authority (CVA).
---

# Angular + Tailwind CSS + CVA Skill

This skill enforces best practices for building reusable UI components (but not pages/feature components) in Angular 21 using Tailwind CSS and `class-variance-authority` (CVA).

## Core Principles

1. **Use CVA for Variants**: Always use `class-variance-authority` (`cva`) to manage styles and variants for reusable UI components (e.g., buttons, badges, inputs, cards).
2. **Separate Variants File**: All CVA logic MUST be placed in a dedicated file named `{component-name}.variants.ts` alongside the component implementation.
3. **Exclusion for Pages**: Do NOT use CVA or `.variants.ts` files for components that are used as pages or high-level layout wrappers. This pattern is strictly for reusable UI components.
4. **Tailwind CSS Integration**: Use Tailwind CSS utility classes within the CVA definitions. Use `cx` or a custom `cn` utility (like `clsx` + `tailwind-merge`) if provided by the project to merge classes effectively.
5. **Type Safety**: Export the `VariantProps` derived from the `cva` definition so the component can strongly type its inputs.

## File Structure Example

For a reusable component named `ButtonComponent` (`button`), the structure should be:

- `button.component.ts` (Component Logic)
- `button.variants.ts` (CVA Definitions)

### `{component-name}.variants.ts` Example

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

### `{component-name}.component.ts` Example

```typescript
import { Component, input, computed } from '@angular/core';
import { buttonVariants, type ButtonVariants } from './button.variants';

@Component({
  selector: 'ui-button',
  standalone: true,
  template: `
    <button [class]="computedClass()">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  variant = input<ButtonVariants['variant']>('default');
  size = input<ButtonVariants['size']>('default');
  userClass = input<string>('', { alias: 'class' });

  computedClass = computed(() => {
    return buttonVariants({
      variant: this.variant(),
      size: this.size(),
      className: this.userClass()
    });
  });
}
```

## Checklist before creating/editing reusable UI components
1. [ ] Is this a reusable UI component? (If it's a page, skip CVA).
2. [ ] Did I create `{component-name}.variants.ts`?
3. [ ] Is the CVA definition exported and strongly typed using `VariantProps`?
4. [ ] Does the component bind the computed CVA classes to the host or root element?
5. [ ] Did I use Angular 21 signal `input()` for the variant configurations?
