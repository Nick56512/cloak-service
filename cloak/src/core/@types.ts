export const enum InjectionTokens {
    RequestHistoryRepository = "RequestHistoryRepository"
}

export const enum ConfigParams {
    CONNECTION_STRING = 'CONNECTION_STRING'
}

export type DetectResult = {
    isBot: boolean,
    ip: string
}
