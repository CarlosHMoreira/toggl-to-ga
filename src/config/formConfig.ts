import { Form } from '../interfaces';
import { FormElementType } from '../enums';

export default {
    project: { name: 'ddlProjeto', type: FormElementType.Select },
    system: { name: 'ddlSistema', type: FormElementType.Select},
    category: { name: 'ddlCategoria', type: FormElementType.Select, shouldAwait: true },
    activity: { name: 'ddlTipoAtividade', type: FormElementType.Select},
    date: { name: 'dtcData', type: FormElementType.Input },
    startTime:{ name: 'inicio', type: FormElementType.Input },
    endTime: { name: 'fim', type: FormElementType.Input },
    description: { name: 'txtDescricao', type: FormElementType.Input },
    controlType: { name: 'ddlTipoControle', type: FormElementType.Select },
    submitAction: { name: '.Btn_Salvar', type: FormElementType.Button },
    errorsCtn: { name: '.lblErro', type: FormElementType.Others },
} as Form;