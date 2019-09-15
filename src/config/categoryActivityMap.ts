import { DevelopmentActivityTypes, TestActivityTypes, AnaliseAndSpecActivityTypes, PlanningAndMettingActivityTypes, AbsencesActivityTypes } from '../enums';

export default {
    Desenvolvimento: {
        id: 12,
        activities: DevelopmentActivityTypes
    },
    Testes: {
        id: 13,
        activities: TestActivityTypes
    },
    Analises_e_Especificacoes: {
        id: 14,
        activities: AnaliseAndSpecActivityTypes
    },
    Planejamento_Reunioes: {
        id: 17,
        activities: PlanningAndMettingActivityTypes
    },
    Ausencias: {
        id: 21,
        activities: AbsencesActivityTypes
    },
    // Suporte: 15,
    // Analises: 16,
    // Atividades_Administrativas: 18,
    // Treinamento: 19,
    // Deploy_QA: 20,
    // Atividade_Operacional_Indevida: 22,
}