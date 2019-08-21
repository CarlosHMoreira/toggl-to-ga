import { Page } from 'puppeteer';

import { Config } from '../interfaces';
import l from '../utils/logger';

export default async (page: Page, { username, password }: Config) => {
    l.info(`About to set login and password as ${username} and ${password} respectively.`);
    
    await page.authenticate({ username, password });
    // await page.evaluate((login, passwd) => {
    //     const loginInput = document.querySelector("[name='login']") as HTMLInputElement;
    //     const passwdInput = document.querySelector("[name='password']") as HTMLInputElement;
        
    //     loginInput.value = login;
    //     passwdInput.value = passwd;
    //     passwdInput.type = 'text';
    // }, username, password); 

    // const submitBtn = await page.$("button[type='submit']") as ElementHandle<HTMLButtonElement>;
    // submitBtn.click();


} 