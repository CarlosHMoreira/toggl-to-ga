export enum Category {
    Desenvolvimento = 12,
    Testes = 13,
    Análises_e_Especificacoes = 14,
    // Suporte = 15,
    // Analises = 16,
    Planejamento_Reunioes = 17,
    // Atividades_Administrativas = 18,
    // Treinamento = 19,
    // Deploy_QA = 20,
    Ausencias = 21,
    // Atividade_Operacional_Indevida = 22,
}

export enum DevelopmentActivityTypes {
    Acompanhamento_Deploy = 120,
    Desenvolvimento_Correção_de_Erros = 103,
    Desenvolvimento_Melhoria = 101,
    Desenvolvimento_Projeto = 102,
    Merge = 119
}

export enum TestActivityTypes {
    Homologacao_Correcao_de_Erros = 131,
    Homologacao_Melhoria = 129,
    Homologacao_Projeto = 130,
    Teste_Integrado_Correcao_de_Erros = 128,
    Teste_Integrado_Melhoria = 126,
    Teste_Integrado_Projeto = 127,
    Teste_Unitario_Correcao_de_Erros = 125,
    Teste_Unitario_Melhoria = 123,
    Teste_Unitario_Projeto = 124,
}

export enum AnaliseAndSpecActivityTypes {
    Diagnostico_possivel_falha = 111,
    Documentacao_Manual_Usuario = 105,
    Levantamento_de_Informacoes_Operacionais = 117,
    Levantamento_Requisitos = 106,
    Pesquisa_novas_solucoes = 121,
}

export enum PlanningAndMettingActivityTypes {
    Gestao_de_Equipe = 110,
    Planning = 115,
    Reuniao_Operacional = 114,
    Reuniao_Projeto = 113,
}

export enum AbsencesActivityTypes {
    Ausencia = 138,
    Ausencia_Consultoria = 135,
}