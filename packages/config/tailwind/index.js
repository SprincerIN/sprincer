/**
 * Shared Sprincer design tokens for Tailwind v4.
 *
 * Usage in apps/packages (CSS-first, Tailwind v4):
 *   @import "@sprincer/config/tailwind/tokens.css";
 *
 * Or extend via the JS config object below if needed by a build tool.
 */

/** @type {Record<string, string>} Sprincer CSS custom properties */
export const tokens = {
  // Brand colors
  "--color-brand-50": "oklch(97% 0.02 250)",
  "--color-brand-100": "oklch(94% 0.04 250)",
  "--color-brand-200": "oklch(88% 0.08 250)",
  "--color-brand-300": "oklch(80% 0.12 250)",
  "--color-brand-400": "oklch(70% 0.16 250)",
  "--color-brand-500": "oklch(60% 0.20 250)",
  "--color-brand-600": "oklch(50% 0.20 250)",
  "--color-brand-700": "oklch(42% 0.18 250)",
  "--color-brand-800": "oklch(34% 0.14 250)",
  "--color-brand-900": "oklch(26% 0.10 250)",
  "--color-brand-950": "oklch(18% 0.06 250)",

  // Surface (light mode defaults)
  "--color-surface": "oklch(100% 0 0)",
  "--color-surface-raised": "oklch(98% 0 0)",
  "--color-surface-overlay": "oklch(96% 0 0)",
  "--color-surface-sunken": "oklch(94% 0 0)",

  // Border
  "--color-border": "oklch(90% 0 0)",
  "--color-border-strong": "oklch(80% 0 0)",

  // Text
  "--color-text-primary": "oklch(15% 0 0)",
  "--color-text-secondary": "oklch(45% 0 0)",
  "--color-text-tertiary": "oklch(65% 0 0)",
  "--color-text-disabled": "oklch(78% 0 0)",
  "--color-text-inverse": "oklch(100% 0 0)",

  // Semantic
  "--color-success": "oklch(60% 0.17 145)",
  "--color-warning": "oklch(72% 0.18 65)",
  "--color-error": "oklch(58% 0.22 25)",
  "--color-info": "oklch(60% 0.18 240)",

  // Radius
  "--radius-sm": "4px",
  "--radius-md": "6px",
  "--radius-lg": "8px",
  "--radius-xl": "12px",
  "--radius-2xl": "16px",
  "--radius-full": "9999px",

  // Shadows
  "--shadow-sm": "0 1px 2px 0 oklch(0% 0 0 / 0.05)",
  "--shadow-md": "0 4px 6px -1px oklch(0% 0 0 / 0.08), 0 2px 4px -2px oklch(0% 0 0 / 0.05)",
  "--shadow-lg": "0 10px 15px -3px oklch(0% 0 0 / 0.08), 0 4px 6px -4px oklch(0% 0 0 / 0.05)",
};

/** Dark mode overrides */
export const darkTokens = {
  "--color-surface": "oklch(12% 0 0)",
  "--color-surface-raised": "oklch(15% 0 0)",
  "--color-surface-overlay": "oklch(18% 0 0)",
  "--color-surface-sunken": "oklch(10% 0 0)",
  "--color-border": "oklch(22% 0 0)",
  "--color-border-strong": "oklch(30% 0 0)",
  "--color-text-primary": "oklch(95% 0 0)",
  "--color-text-secondary": "oklch(70% 0 0)",
  "--color-text-tertiary": "oklch(50% 0 0)",
  "--color-text-disabled": "oklch(38% 0 0)",
  "--color-text-inverse": "oklch(10% 0 0)",
};

export default { tokens, darkTokens };
