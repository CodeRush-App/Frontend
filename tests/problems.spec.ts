import { test, expect } from '@playwright/test';

test.describe('Problems Page', () => {
  test('should render problems list', async ({ page }) => {
    await page.goto('/problems');
    await expect(page).toHaveTitle(/problems/);
  });
});
