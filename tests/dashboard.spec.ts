import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test('should render dashboard and show key elements', async ({ page }) => {
    await page.context().addCookies([{
      name: 'next-auth.session-token',
      value: 'YOUR_SESSION_TOKEN',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: true, // set to true if using https
      sameSite: 'Lax'
    }]);
    
    await page.goto('/dashboard');
    await expect(page).toHaveTitle(/dashboard/);
  });
});
