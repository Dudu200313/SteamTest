import { test, expect } from '@playwright/test';

test('bem-sucedido', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Tab');
    await page.locator('input[type="password"]').fill('senha_certa');
    await page.locator('input[type="password"]').press('Enter');
    await expect(page.getByText('Use the Steam Mobile App to')).toBeVisible();
});

test('nome-com-espacos', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('     nome_usuario     ');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Tab');
    await page.locator('input[type="password"]').fill('senha_certa');
    await page.locator('input[type="password"]').press('Enter');
    await expect(page.getByText('Use the Steam Mobile App to')).toBeVisible();
});

test('senha-incorreta', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Tab');
    await page.locator('input[type="password"]').fill('batata');
    await page.locator('input[type="password"]').press('Enter');
    await expect(page.getByText('Please check your password')).toBeVisible();
});

test('campos-maiusculo-minusculo', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('Nome_Usuario_Maiusculo_Minusculo');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Tab');
    await page.locator('input[type="password"]').fill('Senha_Maiusculo_Minusculo');
    await page.locator('input[type="password"]').press('Enter');
    await expect(page.getByText('Please check your password')).toBeVisible();
});

test('senha-maiusculo-minusculo', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Tab');
    await page.locator('input[type="password"]').fill('Senha_Maiusculo_Minusculo');
    await page.locator('input[type="password"]').press('Enter');
    await expect(page.getByText('Please check your password')).toBeVisible();
});

test('campos-vazios', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://store.steampowered.com/login/');
});

test('senha-vazia', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Enter');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://store.steampowered.com/login/');
});

test('varias-tentativas', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
    await page.locator('#responsive_page_template_content input[type="text"]').press('Tab');
    await page.locator('input[type="password"]').fill('batata');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('input[type="password"]').press('Enter');
    await expect(page.getByText('Something went wrong while')).toBeVisible();
});

test('app-movel', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.getByRole('link', { name: 'Steam Mobile App' }).click();
    const page3Promise = page.waitForEvent('popup');
    await page.locator('#mobile_section').getByRole('link').nth(1).click();
    const page3 = await page3Promise;
    await expect(page3).toHaveURL('https://play.google.com/store/apps/details?id=com.valvesoftware.android.steam.community');
});

test('captcha-esqueceu-senha', async ({ page }) => {
    await page.goto('https://store.steampowered.com/login/');
    await page.getByRole('link', { name: 'Help, I can\'t sign in' }).click();
    await page.getByRole('link', { name: 'I forgot my Steam Account' }).click();
    await page.locator('#forgot_login_search').click();
    await page.locator('#forgot_login_search').fill('teste@gmail.com');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Your response to the CAPTCHA')).toBeVisible();
});
