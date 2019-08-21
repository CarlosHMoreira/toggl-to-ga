import puppeteer from 'puppeteer';
import { config } from '../config'

import l from '../utils/logger';
import setAuthData from './setAuthData';
// import takePrint from '../utils/takePrint';
import getReport from './getReport';

export default async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await setAuthData(page, config);
    await page.goto(config.gaUrl);

    // await takePrint(page);
    l.info('Logged in');

    const registerTimeUrl = `${config.gaUrl}Lists/RegistrosCanaisDigitais/NewForm.aspx?RootFolder`;
    await page.goto(registerTimeUrl);
    // await takePrint(page);
    l.info(`Navigated to ${registerTimeUrl}`);

    getReport();


    await browser.close();
}