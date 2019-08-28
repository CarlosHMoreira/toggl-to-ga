// import puppeteer from 'puppeteer';
// import { config } from '../config'

// import l from '../utils/logger';
// import setAuthData from './setAuthData';
// import navigateToRegisterForm from './navigateToRegisterForm';

import getReport from './getReport';
import resolveTags from './resolveTags';
import resolveProjects from './resolveProjects';

export default async () => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    
    // await setAuthData(page, config);
    // await navigateToRegisterForm(page, config);

    const reportData = await getReport();
    const projects = await resolveProjects(reportData);
    console.log(projects);
    const tagsMeaning = await resolveTags(reportData);
        
    console.log(tagsMeaning);

    // await browser.close();
}