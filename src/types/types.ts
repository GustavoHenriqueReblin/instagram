export type User = {
    id: number,
    username: string,
    password: string,
    token: string
};

type Page = {
    route: string;
    title: string;
    name: string;
};

export const routes: Page[] = [
    {route: '/', title: 'Instagram - Página Inicial', name: 'Página Inicial' },
];