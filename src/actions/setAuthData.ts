import { Page } from 'puppeteer';

import { Config } from '../interfaces';
import l from '../utils/logger';

export default async (page: Page, { username, password }: Config) => {
    l.info(`About to set login and password as ${username} and ${password} respectively.`);
    
    await page.authenticate({ username, password });
} 