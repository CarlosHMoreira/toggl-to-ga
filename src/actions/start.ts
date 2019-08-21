import puppeteer, { Page } from 'puppeteer';
import { config } from '../config'
import { Config } from '../interfaces';

const setAuthData = async (page: Page, { username, password }:Config) => {
    console.log('About to set login and password.');
    return await page.evaluate((login, passwd) => {
       const loginInput = document.querySelector("[name='login']") as HTMLInputElement;
       const passwdInput = document.querySelector("[name='password']") as HTMLInputElement;

       loginInput.value = login;
       passwdInput.value = passwd;
       passwdInput.type = 'text';
    }, username, password);
}

export default async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(config.gaUrl);

    await setAuthData(page, config);
    const filename = (new Date()).toISOString() + '.png';
    await page.screenshot({path: filename});

    await browser.close();
}