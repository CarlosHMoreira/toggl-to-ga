// import puppeteer from 'puppeteer';
// import { config } from '../config'

// import l from '../utils/logger';
// import setAuthData from './setAuthData';
// import navigateToRegisterForm from './navigateToRegisterForm';

import getReport from './getReport';
import identifyTags from './identifyTags';

export default async () => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    
    // await setAuthData(page, config);
    // await navigateToRegisterForm(page, config);

    const reportData = await getReport();
    const tagsMeaning = await identifyTags(reportData);
    
    console.log(tagsMeaning);

    // await browser.close();
}