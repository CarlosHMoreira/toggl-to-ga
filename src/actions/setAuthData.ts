import { Page } from 'puppeteer';
import { Config } from '../interfaces';

export default async (page: Page, { username, password }: Config) => {
    console.log(`About to set login and password as ${username} and ${password} respectively.`);
    return await page.evaluate((login, passwd) => {
       const loginInput = document.querySelector("[name='login']") as HTMLInputElement;
       const passwdInput = document.querySelector("[name='password']") as HTMLInputElement;

       loginInput.value = login;
       passwdInput.value = passwd;
       passwdInput.type = 'text';
    }, username, password); 
} 