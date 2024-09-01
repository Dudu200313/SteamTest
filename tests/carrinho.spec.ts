import { test, expect } from '@playwright/test';

test('adicionar-jogo', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByPlaceholder('search').fill('katana zero');
  await page.getByPlaceholder('search').press('Enter');
  await page.getByRole('link', { name: 'Katana ZERO 18 Apr, 2019 R$' }).click();
  await page.locator('#btn_add_to_cart_100500').click();
  await page.getByRole('button', { name: 'View My Cart (1)' }).click();
  await expect(page.getByText('Your Shopping Cart', { exact: true })).toBeVisible();
  await expect(page.getByText('Katana ZERO')).toBeVisible();
});

test('aumentar-quantidade-jogo', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('link', { name: 'Cart (1)' }).click();
  await page.getByText('Add').click();
  await page.getByText('Add').nth(1).click();
  const elementos = await page.locator('text=Katana ZERO').all();
  const quantidade = elementos.length;
  if (quantidade === 3) {
    console.log('Tudo certo.');
  } else {
    throw new Error('Deu ruim!');
  }
});

test('verificar-preco', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('link', { name: 'Cart (3)' }).click();
  const elementos = await page.locator('text=Katana ZERO').all();
  const quantidade = elementos.length;
  const textoPreco = await page.locator('span').filter({ hasText: 'R$' }).locator('div').first().textContent();
  const numeroPreco = parseFloat(textoPreco.replace('R$', '').replace(',', '.').trim());
  const textoPrecoFinal = await page.getByText('Estimated totalR$').nth(1).textContent();
  const precoFinal = parseFloat(textoPrecoFinal.replace('Estimated totalR$', '').replace(',', '.').trim());
  if (numeroPreco*quantidade === precoFinal) {
    console.log('Tudo certo.');
  } else {
    throw new Error('Deu ruim!');
  }
});

test('remover-jogo', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('link', { name: 'Cart (3)' }).click();
  await page.getByText('Remove').first().click();
  await page.getByText('Remove').nth(1).click();
  await page.getByText('Remove').nth(1).click();
  await expect(page.getByText('Your Shopping Cart', { exact: true })).toBeVisible();
  await expect(page.getByText('Your cart is empty.')).toBeVisible();
});

test('permanencia-apos-logout', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByPlaceholder('search').fill('katana zero');
  await page.getByPlaceholder('search').press('Enter');
  await page.getByRole('link', { name: 'Katana ZERO 18 Apr, 2019 R$' }).click();
  await page.locator('#btn_add_to_cart_100500').click();
  await page.getByRole('button', { name: 'View My Cart (1)' }).click();
  await page.getByLabel('Account Menu').getByText('TesteQualidade*****').click();
  await page.getByRole('link', { name: 'Sign out of account...' }).click();
  await page.goto('https://store.steampowered.com/');
  await page.getByRole('link', { name: 'login' }).click();
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('link', { name: 'Cart (1)' }).click();
  await expect(page.getByText('Your Shopping Cart', { exact: true })).toBeVisible();
  await expect(page.getByText('Katana ZERO')).toBeVisible();
});