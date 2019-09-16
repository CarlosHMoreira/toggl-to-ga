import { Page } from 'puppeteer';

import { Config } from '../interfaces';
import l from '../utils/logger';

export default async (page: Page, { username, password, gaUrl }: Config) => {
    l.info(`About to set login and password as ${username} and ${password} respectively.`);
    
    await page.authenticate({ username, password });
    page.on('dialog', (dialog) => dialog.dismiss());
    
    await page.goto(gaUrl, { waitUntil: 'networkidle2' });

    l.info('Logged in');
} 