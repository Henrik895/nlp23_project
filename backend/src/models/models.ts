export interface Model {
    name: string;
    fullName: string,
    type: string;
    api: string;
}

export const models: Model[] = [
    // Hackish temporary solution
    {
        name: 'crypto',
        fullName: 'Cryptocurrency',
        type: 'GPT-2 (117M)',
        api: process.env.NODE_ENV === 'production' ? 'http://model_crypto:8001' : 'http://127.0.0.1:8001'
    },
    {
        name: 'irl',
        fullName: 'Me irl',
        type: 'GPT-2 (117M)',
        api: process.env.NODE_ENV === 'production' ? 'http://model_irl:8002' : 'http://127.0.0.1:8002'
    },
    {
        name: 'wsb',
        fullName: 'Wall Street Bets',
        type: 'GPT-2 (117M)',
        api: process.env.NODE_ENV === 'production' ? 'http://model_wsb:8003' : 'http://127.0.0.1:8003',
    },
    {
        name: 'aw',
        fullName: 'Antiwork',
        type: 'GPT-2 (117M)',
        api: process.env.NODE_ENV === 'production' ? 'http://model_aw:8004' : 'http://127.0.0.1:8004',
    }

];