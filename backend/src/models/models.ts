export interface Model {
    name: string;
    fullName: string,
    type: string;
    api: string;
}

export const models: Model[] = [
    {
        name: 'wsb',
        fullName: 'Wall Street Bets',
        type: 'GPT-2 small',
        api: 'http://localhost:8000',
    }
];