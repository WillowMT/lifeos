// @vitest-environment node

import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

describe("mobile app shell", () => {
  test("keeps the final page action clear of the fixed bottom navigation", () => {
    const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

    expect(css).toMatch(
      /\.page-content\s*>\s*\*\s*{[^}]*margin-bottom:\s*28px/s,
    );
    expect(css).toMatch(
      /\.primary-button,\s*\.danger-button\s*{[^}]*scroll-margin-bottom:\s*calc\(\s*var\(--mobile-nav-height\)\s*\+\s*env\(safe-area-inset-bottom\)\s*\+\s*20px\s*\)/s,
    );
  });
});
