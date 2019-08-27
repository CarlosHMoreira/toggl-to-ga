import { Page } from 'puppeteer';

import { Config } from '../interfaces';
import l from '../utils/logger';
import takePrint from '../utils/takePrint';

export default async (page: Page, { username, password, gaUrl }: Config) => {
    l.info(`About to set login and password as ${username} and ${password} respectively.`);
    
    await page.authenticate({ username, password });
    await page.goto(gaUrl);
    await takePrint(page);

    l.info('Logged in');
} 