import puppeteer from 'puppeteer';
import { config } from '../config'

import l from '../utils/logger';
import setAuthData from './setAuthData';
import navigateToRegisterForm from './navigateToRegisterForm';

import getReport from './getReport';
import checkInconsistecies from './checkInconsistecies';
import fixAfterMidnightRegisters from './fixAfterMidnightRegisters';
import resolveTags from './resolveTags';
import resolveProjects from './resolveProjects';
import toRegisterList from './toRegisterList';
import registerReports from './registerReports';

export default async () => {
    const reportData = await getReport();
    
    checkInconsistecies(reportData);

    l.info('Ok! No timesheet inconsistences found.');

    const fixedReport = fixAfterMidnightRegisters(reportData);
    const projectMap = await resolveProjects(fixedReport);
    const tagMap = await resolveTags(fixedReport);
    const registerList = await toRegisterList(fixedReport, projectMap, tagMap);  
    
    const browser = await puppeteer.launch({
        headless: false,timeout: 60000,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--ignore-certificate-errors',
          '--disable-gpu'
        ]
    });
    const page = await browser.newPage();
    await setAuthData(page, config);  
    await navigateToRegisterForm(page, config);
    await registerReports(page, registerList);

    await browser.close();
}