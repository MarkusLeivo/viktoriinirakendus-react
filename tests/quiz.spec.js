import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.evaluate(() => localStorage.clear()); // Peab tühjendama, et viktoriin algaks uuesti algusest.

  await page.reload();

  await page.waitForSelector('[data-testid="start-button"]');
});


test('rakendus avaneb ja algusleht kuvatakse', async ({ page }) => {

  await expect(page.getByTestId('start-button')).toBeVisible();

});


test('viktoriini saab alustada', async ({ page }) => {

  await page.getByTestId('start-button').click();

  await expect(page.getByTestId('question')).toBeVisible();

});


test('küsimusele saab vastata', async ({ page }) => {

  await page.getByTestId('start-button').click();

  await page.getByTestId('answer-button').first().click();

  await expect(page.getByTestId('feedback')).toBeVisible();

});


test('vale vastus kuvab tagasiside', async ({ page }) => {

  await page.getByTestId('start-button').click();

  await page.locator('[data-correct="false"]').first().click();

  const feedback = page.getByTestId('feedback');

  await expect(feedback).toBeVisible();

  await expect(page.getByTestId('feedback')).toContainText('Õige vastus on:');

});


test('õige vastus kuvab tagasiside', async ({ page }) => {

  await page.getByTestId('start-button').click();

  await page.locator('[data-correct="true"]').click();

  const feedback = page.getByTestId('feedback');

  await expect(feedback).toBeVisible();

  await expect(page.getByTestId('feedback')).toContainText('Õige vastus!');

});


test('viktoriini lõpus kuvatakse tulemuste tabel', async ({ page }) => {

  await page.getByTestId('start-button').click();

  for (let i = 0; i < 10; i++) {

    await page.getByTestId('answer-button').first().click();

    const nextButton = page.getByTestId('next-button');

    if (await nextButton.isVisible()) {
      await nextButton.click();
    }
  }

  await expect(page.getByTestId('results-table')).toBeVisible();

});


test('lõpus kuvatakse skoor', async ({ page }) => {

  await page.getByTestId('start-button').click();

  for (let i = 0; i < 10; i++) {

    await page.getByTestId('answer-button').first().click();

    const nextButton = page.getByTestId('next-button');

    if (await nextButton.isVisible()) {
      await nextButton.click();
    }
  }

  await expect(page.getByTestId('score')).toBeVisible();

});