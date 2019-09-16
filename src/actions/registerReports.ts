import { Page } from 'puppeteer';
import { FormRegister } from '../interfaces';
import { FormElement } from '../interfaces';
import { FormElementType } from '../enums';
import { setInputValue, setSelectValue, getErrors } from '../utils/formHelper';
import formConfig from '../config/formConfig';

//** @todo  refactor */
const getEntriesWithConfig = (
    register: FormRegister, 
    configEntries: any[]
) => Object.entries(register)
    .map(([property, value]) => {
        const [_, config ] = configEntries
            .find(([configProperty]) => configProperty == property) as any[];
        
        return {
            value: value.toString(),
            config
        };
    });

const fillForm = async (page: Page, entries: { value: string, config: FormElement}[]) => {
    for (const { value, config } of entries) {
        const { name, type, shouldAwait } = config as FormElement;
        if (type === FormElementType.Input) {
            await setInputValue(page, name, value, shouldAwait)
        }

        if (type === FormElementType.Select) {
            await setSelectValue(page, name, value, shouldAwait)
        }
    }
}

export default async (page: Page, reports: FormRegister[]) => {
    //** @todo  refactor */
    const configEntries = Object.entries(formConfig);

    for (const register of reports) {
        const entries = getEntriesWithConfig(register, configEntries);
        await fillForm(page, entries);
    }

    const p = new Promise(resolve => { setTimeout( () => resolve(), 100000) } );
    
    await p;

    await getErrors(page, formConfig.errorsCtn.name);
};

