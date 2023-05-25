import { Page, expect } from "@playwright/test";

export const locators = {
  loginLink(page: Page) {
    return page.getByRole("link", { name: "Login" });
  },
  logoutLink(page: Page) {
    return page.getByRole("link", { name: "Logout" });
  },
};

export const login = async (page: Page, email: string, password: string) => {
  await expect(page).toHaveURL("/login");
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);

  await page.getByRole("button", { name: "Login" }).click();
};
