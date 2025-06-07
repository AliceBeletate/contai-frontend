import { useState } from "react";
import { api } from '../services/api';

export function LaunchForm() {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [type, setType] = useState<'Credit' | 'Debit'> ('Credit');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post('/transactions', {
                date,
                description,
                value: Number(value),
                type,
            });
            alert('Lançamento salvo com sucesso!');
        } catch (err) {
            alert('Erro ao salvar lançamento');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{background: '#e0f0ff', padding: '1rem', borderRadius: '10px'}}>
            <h2 style={{ color: '#007acc'}}>Cadastrar Lançamento</h2>

            <label>Data:</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />

            <label>Descrição:</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />

            <label>Valor: </label>
            <input type="number" min="0" value={value} onChange={e => setValue(e.target.value)} required />

            <label>Tipo: </label>
            <select value={type} onChange={e => setType(e.target.value as 'Credit' | 'Debit')}>
                <option value="Credit">Crédito</option>
                <option value="Debit">DDébito</option>
            </select>

            <button type="submit" style={{marginTop: '1rem', background: '#007acc', color: '#fff'}}> Salvar </button>
        </form>
    );
}