import { test, expect } from "@playwright/test";
import { locators, login } from "./functions";

test.describe("test", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(
      page.locator(".chakra-heading", { hasText: "Random Number:" })
    ).toBeVisible();
  });

  test("check the number", async ({ page }) => {
    // wait for number loading
    await page.waitForTimeout(2000);

    const text = await page
      .locator(".chakra-heading", { hasText: "Random Number:" })
      .textContent();

    const number = text?.split("Random Number: ")[1];
    console.log(number);

    expect(Number(number)).toBeGreaterThan(0);
    expect(Number(number)).toBeLessThan(100);
  });

  test.only("login", async ({ page }) => {
    await locators.loginLink(page).click();
    await expect(page).toHaveURL("/login");

    await page.locator('input[name="email"]').fill("string");
    await page.locator('input[name="password"]').fill("secret");

    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("/dashboard");
  });

  test("unsuccessful login", async ({ page }) => {
    await locators.loginLink(page).click();
    await expect(page).toHaveURL("/login");

    await page.locator('input[name="email"]').fill("string");
    await page.locator('input[name="password"]').fill("sec");

    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("/login");
  });

  test("check email displayed in the dashboard", async ({ page }) => {
    const email = "testUser";

    await locators.loginLink(page).click();
    await login(page, email, "secret");
    await expect(page.getByText(`Welcome ${email}`)).toBeVisible();
  });

  test("check user logged in after reload", async ({ page }) => {
    const email = "testUser";

    await locators.loginLink(page).click();
    await login(page, email, "secret");
    await expect(page).toHaveURL("/dashboard");
    await page.reload();
    await expect(page.getByText(`Welcome ${email}`)).toBeVisible();
  });

  test("check the path after logging out", async ({ page }) => {
    const email = "testUser";

    await locators.loginLink(page).click();
    await login(page, email, "secret");
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByText(`Welcome ${email}`)).toBeVisible();

    await locators.logoutLink(page).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Home")).toBeVisible();
  });
});
