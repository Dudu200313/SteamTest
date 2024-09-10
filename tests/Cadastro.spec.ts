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
  await page.goto('https://store.steampowered.com/join');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('silva.doido@gmail.com');
});

test('Teste de preenchimento do imput confirma teu endereço', async ({ page }) => {
  await page.goto('https://store.steampowered.com/join')
  await page.getByLabel('Confirm your Address').click();
  await page.getByLabel('Confirm your Address').fill('silva.doido@gmail.com');
});

test('Teste do imput de país de resedência', async ({ page }) => {
  await page.goto('https://store.steampowered.com/join')
  await page.getByLabel('Country of Residence').selectOption('BY');
  await page.getByLabel('Country of Residence').selectOption('BR');
});

test('Testando o imput de Tenho 13 anos ou mais', async ({ page }) => {
  await page.goto('https://store.steampowered.com/join')
  await page.getByLabel('I am 13 years of age or older and agree to the terms of the Steam Subscriber Agreement and the Valve Privacy Policy.').check();
});

test('Testando se a aplicação passa para outra parte do cadastro com campos não preenchidos', async ({ page }) => {
  await page.goto('https://store.steampowered.com/join')
  await page.getByLabel('email address').fill('silva@gmail.com');
  await page.getByText('confirm your address').click();
  await page.getByLabel('I am 13 years of age or older and agree to the terms of the Steam Subscriber Agreement and the Valve Privacy Policy.').check();
  await page.getByRole('button', { name: 'Continue' }).click();
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