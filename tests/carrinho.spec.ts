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

test('botao-continuar-pagamento', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('link', { name: 'Cart (1)' }).click();
  await page.getByRole('button', { name: 'Continue to payment' }).click();
  await expect(page.getByText('Payment Info Review + Purchase')).toBeVisible();
  await expect(page.locator('#cart_area')).toBeVisible();
  await expect(page.getByText('Payment Methods We accept the following secure payment methods: Purchasing on')).toBeVisible();
});

test('aumentar-quantidade-jogo', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('link', { name: 'Cart (1)' }).click();
  await page.getByText('Add').click();
  await page.getByText('Add').nth(1).click();
  const quantidade = await page.locator('text=Katana ZERO').count();
  if (quantidade !== 3) {
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
  if (numeroPreco*quantidade !== precoFinal) {
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
  await page.getByText('Remove').first().click();
});

test('verificar-informacoes', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByPlaceholder('search').fill('katana zero');
  await page.getByPlaceholder('search').press('Enter');
  await page.getByRole('link', { name: 'Katana ZERO 18 Apr, 2019 R$' }).click();
  const precoPaginaTexto = await page.getByText('R$').first().textContent();
  const precoPaginaNumero = parseFloat(precoPaginaTexto.replace('R$', '').replace(',', '.').trim());
  await page.locator('#btn_add_to_cart_100500').click();
  await page.getByRole('button', { name: 'View My Cart (1)' }).click();
  await expect(page.getByText('Katana ZERO')).toBeVisible();
  const precoCarrinhoTexto = await page.locator('span').filter({ hasText: 'R$' }).locator('div').first().textContent();
  const precoCarrinhoNumero = parseFloat(precoCarrinhoTexto.replace('R$', '').replace(',', '.').trim());
  if (precoPaginaNumero !== precoCarrinhoNumero) {
    throw new Error('Deu ruim!');
  }
});

test('wishlist', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByPlaceholder('search').fill('katana zero');
  await page.getByPlaceholder('search').press('Enter');
  await page.getByRole('link', { name: 'Katana ZERO 18 Apr, 2019 R$' }).click();
  await page.getByRole('link', { name: 'Add to your wishlist' }).click();
  await page.getByRole('link', { name: 'Wishlist (1)' }).click();
  await expect(page.getByText('Katana ZERO')).toBeVisible();
});

test('comprar-presente', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('link', { name: 'Cart (1)' }).click();
  await page.getByText('For my account').click();
  await page.getByText('This is a gift').click();
  await page.getByRole('button', { name: 'Continue to gift options' }).click();
  await page.getByRole('button', { name: 'Select gift recipient...' }).click();
  await page.getByText('Kagaru NakombiOn wishlist').click();
});

test('presente-duplicado', async ({ page }) => {
  await page.goto('https://store.steampowered.com/login/');
  await page.locator('#responsive_page_template_content input[type="text"]').fill('nome_usuario');
  await page.locator('input[type="password"]').fill('senha_certa');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('link', { name: 'Cart (1)' }).click();
  await page.getByText('Add', { exact: true }).click();
  await page.getByRole('button', { name: 'Continue to gift options' }).click();
  await page.getByRole('button', { name: 'Select gift recipient...' }).click();
  await page.getByText('Kagaru NakombiOn wishlist').click();
  await expect(page.getByText('Already in your cart:1Katana').first()).toBeVisible();
});