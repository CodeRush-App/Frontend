import { test, expect } from '@playwright/test';

test.describe('Solve Page', () => {
  test('should render solve page for a problem', async ({ page }) => {
    // Replace with a real problemId if needed
    const problemId = 'example-problem';
    await page.goto(`/solve/${problemId}`);
    await expect(page).toHaveTitle(/solve/);
  });
});
