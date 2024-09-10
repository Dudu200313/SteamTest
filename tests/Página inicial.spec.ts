import { test, expect } from '@playwright/test';

test('Testando barra de pesquisa', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE3NzdqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Bem-vindo(a) ao Steam Steam' }).click();
  await page.getByPlaceholder('procurar').click();
  await page.getByPlaceholder('procurar').fill('dark souls');
  await page.getByLabel('Procurar no Steam').locator('img').click();
});

test('Verificando se o botão Comunidade redireciona para a página correta.', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE1NTBqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Bem-vindo(a) ao Steam Steam' }).click();
  await page.getByRole('link', { name: 'COMUNIDADE' }).click();
});

test('Verificando se o botão Suporte redireciona para a página correta.', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE1NjBqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Bem-vindo(a) ao Steam Steam' }).click();
  await page.getByRole('link', { name: 'SUPORTE' }).click();
});

test('Testando o botão Jogos gratuitos', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE3MDFqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Bem-vindo(a) ao Steam Steam' }).click();
  await page.getByRole('link', { name: 'Jogos gratuitos' }).click();
});

test('Testando campo explora por categoria (Casuais)', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDIxNjVqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Bem-vindo(a) ao Steam Steam' }).click();
  await page.getByRole('link', { name: 'Casual', exact: true }).nth(1).click();
});

test('Testando campo explora por categoria (Corridas)', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE1ODNqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Bem-vindo(a) ao Steam Steam' }).click();
  await page.getByRole('link', { name: 'Ação' }).nth(1).click();
});


test('Testando a fluidez e a responsividade do carrossel de explorar por categoria ', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDI1NThqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Bem-vindo(a) ao Steam Steam' }).click();
  await page.locator('.content_hub_carousel > .carousel_container > div:nth-child(4) > div').click();
  await page.locator('.content_hub_carousel > .carousel_container > div:nth-child(4) > div').click();
  await page.locator('.content_hub_carousel > .carousel_container > div:nth-child(3) > div').click();
  await page.locator('.content_hub_carousel > .carousel_container > div:nth-child(3) > div').click();
});

test('Testando a fluidez da navegação das tabs de content trigger', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE3MTlqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Bem-vindo(a) ao Steam Steam' }).click();
  await page.locator('#tab_topsellers_content_trigger').getByText('Mais vendidos').click();
  await page.locator('#tab_upcoming_content_trigger').getByText('Mais antecipados').click();
  await page.locator('#tab_newreleases_content_trigger').getByText('Novidades populares').click();
});

test('Testando o Dropdowns', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDQ4NzlqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.goto('https://store.steampowered.com/?l=portuguese');
  await page.getByRole('link', { name: 'Categorias' }).click();
  await page.getByRole('link', { name: 'Arcade e Ritmo' }).click();
});

test('Testando a fluidez e a responsividade do carrossel de promoções especiais', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDEzMTlqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Bem-vindo(a) ao Steam Steam' }).click();
  await page.locator('#spotlight_carousel > div:nth-child(4)').click();
  await page.locator('#spotlight_carousel > div:nth-child(4)').click();
  await page.locator('#spotlight_carousel > div:nth-child(4) > div').click();
  await page.locator('#spotlight_carousel > div:nth-child(3)').click();
  await page.locator('#spotlight_carousel > div:nth-child(3) > div').click();
  await page.locator('#spotlight_carousel > div:nth-child(3) > div').click();
});

