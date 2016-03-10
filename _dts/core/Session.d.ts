export default class Session {
    started: boolean;
    DataAtualizacao: string;
    user: fatores.entidades.User;
    empresa: any;
    obra: any;
    contratada: any;
    tarefa: any;
    equipe: any;
    atividades: any;
    atividadesTarefa: any;
    constructor();
    setUser(user: any): void;
    setConfig(selecteds: any): void;
    setAtividades(atividades: any): void;
    setAtividadesTarefa(atvTar: any): void;
    getToken(): string;
    reset(): void;
    start(): void;
    end(): void;
}
