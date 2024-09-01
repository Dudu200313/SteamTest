import { test, expect } from '@playwright/test';

test('Teste para saber se o imput de email address é clicáveu', async ({ page }) => {
  await page.goto('https://store.steampowered.com/join');
  await page.getByLabel('email address').click();
});

test('Teste para saber se o imput de confirm your address é clicáveu', async ({ page }) => {
  await page.goto('https://store.steampowered.com/join');
  await page.getByLabel('confirm your address').click();
});

test('Teste de preenchimento do imput endereço de email', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE0NTVqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Cria a tua conta' }).click();
  await page.getByLabel('Endereço de e-mail').click();
  await page.getByLabel('Endereço de e-mail').fill('silva.doido@gmail.com');
});

test('Teste de preenchimento do imput confirma teu endereço', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE0NTVqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Cria a tua conta' }).click();
  await page.getByLabel('Confirma o teu endereço').click();
  await page.getByLabel('Confirma o teu endereço').fill('silva.doido@gmail.com');
});

test('Teste do imput de país de resedência', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE4NzRqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Cria a tua conta' }).click();
  await page.getByLabel('País de residência').selectOption('BY');
  await page.getByLabel('País de residência').selectOption('BR');
});

test('Testando o imput de Tenho 13 anos ou mais', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDIxOTBqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Cria a tua conta' }).click();
  await page.getByLabel('Tenho 13 anos ou mais de').check();
});

test('Testando se a aplicação passa para outra parte do cadastro com campos não preenchidos', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=steam&oq=steam&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDU1OTFqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Cria a tua conta' }).click();
  await page.getByLabel('Endereço de e-mail').click();
  await page.getByLabel('Endereço de e-mail').fill('silva@gmail.com');
  await page.getByText('Confirma o teu endereço').click();
  await page.getByLabel('Tenho 13 anos ou mais de').check();
  await page.getByRole('button', { name: 'Continuar' }).click();
});

test('Testando imput de nome de conta steam', async ({ page }) => {
  await page.goto('https://store.steampowered.com/join/completesignup?l=portuguese&creationid=254503443304180644');
  await page.getByLabel('Nome de conta Steam').click();
  await page.getByLabel('Nome de conta Steam').fill('d');
});

test('Testando imput de escolhe a palavra-passe', async ({ page }) => {
  await page.goto('https://store.steampowered.com/join/completesignup?l=portuguese&creationid=254503443304180644');
  await page.getByLabel('Escolhe a palavra-passe').click();
  await page.getByLabel('Escolhe a palavra-passe').fill('E');
});

test('Testando imput de confirma a palavra-passe', async ({ page }) => {
  await page.goto('https://store.steampowered.com/join/completesignup?l=portuguese&creationid=254503443304180644');
  await page.getByLabel('Confirma a palavra-passe').click();
  await page.getByLabel('Confirma a palavra-passe').fill('eduardo22');
});