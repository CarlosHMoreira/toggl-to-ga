import puppeteer from 'puppeteer';
import { config } from '../config'

import setAuthData from './setAuthData';
import getReport from './getReport';

export default async () => {
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    await page.goto(config.gaUrl);
    
    // await page.screenshot({path: `screenshots/${new Date().toISOString()}.png`});
    
    await setAuthData(page, config);

    getReport();

    await browser.close();
}