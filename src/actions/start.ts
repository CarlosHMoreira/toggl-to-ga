import puppeteer from 'puppeteer';
import { config } from '../config'

import setAuthData from './setAuthData';

export default async () => {
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    await page.goto(config.gaUrl);
    
    await setAuthData(page, config);
    await page.screenshot({path: `screenshots/${new Date().toISOString()}.png`});

    await browser.close();
}