import { Page } from 'puppeteer';

import { Config } from '../interfaces';
import l from '../utils/logger';

export default async (page: Page, { gaUrl }: Config) => {
    const registerTimeUrl = `${gaUrl}Lists/RegistrosCanaisDigitais/NewForm.aspx?RootFolder`;
    await page.goto(registerTimeUrl);
    
    l.info('Navigating to Register page.')
};