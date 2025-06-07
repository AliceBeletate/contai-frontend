export interface Launch {
    id?: number;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
}