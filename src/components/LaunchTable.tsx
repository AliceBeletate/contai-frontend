import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Launch } from '../types/Launch';
import dayjs from 'dayjs';

type GroupedLaunches = {
    [key: string]: Launch[];
};

export function LaunchTable() {
    const [launches, setLaunches] = useState<Launch[]>([]);

    useEffect(() => {
        api.get<Launch[]>('/transactions').then(response => {
            setLaunches(response.data);
        });
    }, []);

    const grouped: GroupedLaunches = launches.reduce((acc, launch) => {
        const key = dayjs(launch.date).format('MM/YYYY');
        if (!acc[key]) acc[key] = [];
        acc[key].push(launch);
        return acc;
    }, {} as GroupedLaunches);

    return (
        <div>
            <h2 style={{ color: '#007acc' }}>Lançamentos</h2>
            {Object.entries(grouped).map(([monthYear, items]) => {
                const totalCredit = items
                    .filter(l => l.type === 'credit')
                    .reduce((sum, l) => sum + l.amount, 0);
                const totalDebit = items
                    .filter(l => l.type === 'debit')
                    .reduce((sum, l) => sum + l.amount, 0);

                return (
                    <div key={monthYear} style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginTop: '2rem' }}>{monthYear}</h3>
                        <table border={1} style={{ width: '100%', marginTop: '0.5rem' }}>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(launch => (
                                    <tr key={launch.id}>
                                        <td>{dayjs(launch.date).format('DD/MM/YYYY')}</td>
                                        <td>{launch.description}</td>
                                        <td>R$ {launch.amount.toFixed(2)}</td>
                                        <td>{launch.type === 'credit' ? 'Crédito' : 'Débito'}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2}><strong>Total Crédito:</strong></td>
                                    <td colSpan={2}>R$ {totalCredit.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><strong>Total Débito:</strong></td>
                                    <td colSpan={2}>R$ {totalDebit.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}



/* Para cada lançamento no array launches, criamos uma nova linha <tr>.

map é como um "para cada".

*/