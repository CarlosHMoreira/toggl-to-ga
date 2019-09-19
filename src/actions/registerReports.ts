import { Page } from 'puppeteer';

import { FormRegister, Form, FormElement } from '../interfaces';
import { FormElementType } from '../enums';
import { setInputValue, setSelectValue, getErrors, userConfirmation } from '../utils/formHelper';
import formConfig from '../config/formConfig';
import envConfig from '../config/config'
import navigateToRegisterForm from './navigateToRegisterForm';
import l from '../utils/logger';

//** @todo  refactor */
const getEntriesWithConfig = (
    register: FormRegister, 
) => (Object.entries(register) as Array<[keyof Form, string | number]>)
    .map(([property, value]) => {
        const config = formConfig[property];
        return {
            value: value.toString(),
            config
        };
    });

const fillForm = async (page: Page, entries: { value: string, config: FormElement}[]) => {
    for (const { value, config } of entries) {
        const { name, type, shouldAwait } = config as FormElement;

        if (type === FormElementType.Input) {
            await setInputValue(page, name, value, shouldAwait);
        }

        if (type === FormElementType.Select) {
            await setSelectValue(page, name, value, shouldAwait)
        }
    }
}

export default async (page: Page, reports: FormRegister[]) => {
    for (const register of reports) {
        const entries = getEntriesWithConfig(register);
        
        await fillForm(page, entries);

        if (envConfig.debugInput) await userConfirmation('Confirm all form data ?');
        
        await Promise.all([
            page.waitForNavigation(),
            page.click(formConfig.submitAction.name)
        ]);

        l.info('\n Checking for errors');
        await getErrors(page, formConfig.errorsCtn.name);
        l.info('Everything semmed to be ok :). Going to next!');

        await navigateToRegisterForm(page, envConfig); // same as refresh
    }
};

