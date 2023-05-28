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
        api: process.env.NODE_ENV === 'production' ? 'http://model_wsb:8000' : 'http://127.0.0.1:8000', // Hackish temporary solution (replace with file)
    }
];