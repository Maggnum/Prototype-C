import { test, expect, Page } from "@playwright/test";

const route = async (page: Page) => {
  await page.getByRole("button", { name: "Route" }).click();
  await page.waitForResponse("**/directions");
};

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test("test", async ({ page }) => {
  await route(page);
  await expect(page.locator(".leaflet-interactive").first()).toBeVisible();
});
