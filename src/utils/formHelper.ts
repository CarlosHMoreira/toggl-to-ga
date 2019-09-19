import { Page, ElementHandle } from 'puppeteer';
import prompts, { PromptObject } from 'prompts';

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

export const userConfirmation = async (message = 'Do you confirm ?') => {
    const promptConfig = {
        type: 'select',
        name: 'confirm',
        message: 'Do you confirm ?',
        choices: [
            {
                title: 'Yep!', 
                value: 'true',
            },
            {
                title: 'Of course, not!! :(', 
                value: 'false',
            },
        ]
    } as PromptObject;

    const { confirm } = await prompts(promptConfig);
    if (confirm === 'false') {
        throw Error('Action not confirmed');
    }
}


export const setSelectValue = async (page: Page, selector: string, value: string, shouldWait = false)  => {
    try {
        const querySelector = `.${selector}`;
        const optionQuerySelector = `${querySelector} option[value="${value}"]`

        l.info(`\n About to set select ${selector} with value option ${value} and should ${shouldWait ? '' : 'not'} await`);

        await page.waitForSelector(querySelector);
        await page.waitForSelector(optionQuerySelector);
        await Promise.all([
            (shouldWait ? page.waitForNavigation() : Promise.resolve()) as Promise<Response|void>,
            page.select(querySelector, value)
        ]);
    
        l.d(`${selector} setted value`);

        const actualValue = await getValueFrom(page, selector);
        
        l.warn(`${selector} now with value ${actualValue}`);
    } catch(error) {
        l.error('Error when triying to set a select option');
        throw error;
    }
};

const typeIt = async (page:Page, selector: string, value: string, clickCount = 3) => {
    const elHandle  =  await page.$(selector) as ElementHandle<Element>;
    
    if (!elHandle) throw new Error(`Element ${selector} not found`);
    
    await elHandle.click();
    l.d(`Clicked in ${selector}`);
    await elHandle.focus();
    l.d(`Focused in ${selector}`);
    await elHandle.click({ clickCount });
    l.d(`Clicked ${clickCount} times in ${selector}`);
    await elHandle.press('Backspace');
    l.d(`Pressed Backspace in ${selector}`);
    await elHandle.type(value);
    l.d(`Typed ${value} in ${selector}`);
    
    const jsHandle = await elHandle.getProperty('value');
    const actualValue = await jsHandle.jsonValue();
    l.warn(`Actual value is ${actualValue}`);
};

export const setInputValue = async (page: Page, selector: string, value: string, shouldWait = false)  => {
    l.info(`\n About to set ${selector} with ${value}, should ${shouldWait ? '' : 'not'} await.`);
    try {
        const querySelector = `.${selector}`;

        await page.waitForSelector(querySelector);
        await Promise.all([
            (shouldWait ? page.waitForNavigation() : Promise.resolve()) as Promise<Response|void>,
            typeIt(page, querySelector, value)
        ]);
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

