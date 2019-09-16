import { Page } from 'puppeteer';

import l from '../utils/logger';

export const getValueFrom = async (page: Page, selector: string)  => {
    try {
        const querySelector = `.${selector}`;
        await page.waitForSelector(querySelector);
        const elHandle = await page.$(querySelector);

        if (!elHandle) throw new Error(`Element ${querySelector} not found`);

        const jshandle = await elHandle.getProperty('value');
        return await jshandle.jsonValue();

    } catch(error) {
        l.error('Error when triying to select element');
        throw error;
    }
};


export const setSelectValue = async (page: Page, selector: string, value: string, shouldWait = false)  => {
    try {
        const querySelector = `.${selector}`;
        const optionQuerySelector = `${querySelector} option[value="${value}"]`

        await page.waitForSelector(querySelector);
        await page.waitForSelector(optionQuerySelector);
        await Promise.all([
            (shouldWait ? page.waitForNavigation() : Promise.resolve()) as Promise<Response|void>,
            page.select(querySelector, value)
        ]);

        await page.waitForSelector(querySelector);
        const elHandle = await page.$(querySelector);

        // if (!elHandle) throw new Error(`Element ${selector} not found`);

        // const jshandle = await elHandle.getProperty('value');
        // await jshandle.jsonValue();
    } catch(error) {
        l.error('Error when triying to set a select option');
        throw error;
    }
};

const typeIt = async (page:Page, selector: string, value: string, clickCount = 3) => {
    const elHandle =  await page.$(selector);
    
    if (!elHandle) throw new Error(`Element ${selector} not found`);

    await elHandle.click();
    await elHandle.focus();
    await elHandle.click({ clickCount });
    await elHandle.press('Backspace');
    await elHandle.type(value);
};

export const setInputValue = async (page: Page, selector: string, value: string, shouldWait = false)  => {
    try {
        const querySelector = `.${selector}`;

        await page.waitForSelector(querySelector);
        await Promise.all([
            (shouldWait ? page.waitForNavigation() : Promise.resolve()) as Promise<Response|void>,
            typeIt(page, querySelector, value)
        ]);

        // await page.waitForSelector(querySelector);
        // const elHandle = await page.$(querySelector);

        // if (!elHandle) throw new Error(`Element ${selector} not found`);

        // const jshandle = await elHandle.getProperty('value');
        // await jshandle.jsonValue();

    } catch(error) {
        l.error('Error when triying to set value to');
        throw error;
    }
};

export const getErrors = async (page: Page, selector: string) => {
    const errors = [];
    const errorEls = await page.$$(selector);

    for (const errorEl of errorEls) {
        const error = await page.evaluate((el) => el.innerText, errorEl);
        if (!!error) errors.push(error);
    }

    if (errors.length) {
        l.error('Error on submit form');
        console.table(errors);
        throw new Error('Error on submit form');
    }
}

