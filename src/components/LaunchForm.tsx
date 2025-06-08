import { useState } from "react";
import { api } from '../services/api';

interface LaunchFormProps {
  onAdd: () => Promise<void>;
}

export function LaunchForm({ onAdd }: LaunchFormProps) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<'credit' | 'debit'>('credit');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/transactions', {
        date,
        description,
        amount: Number(value),
        type,
      });

      alert('Lançamento salvo com sucesso!');
      setDate('');
      setDescription('');
      setValue('');
      setType('credit');
      await onAdd();
    } catch (err) {
      alert('Erro ao salvar lançamento');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#e0f0ffd2', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
      <h2 style={{ color: '#008B8B' }}>Cadastrar Lançamento</h2>

      <label>Data: </label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <br />

      <label>Descrição: </label>
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
      <br />

      <label>Valor: </label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={e => setValue(e.target.value)}
        required
      />
      <br />

      <label>Tipo: </label>
      <select value={type} onChange={e => setType(e.target.value as 'credit' | 'debit')}>
        <option value="credit">Crédito</option>
        <option value="debit">Débito</option>
      </select>
      <br />

      <button
        type="submit"
        style={{
          marginTop: '1rem',
          background: '#4682B4',
          color: '#fff',
          cursor: 'pointer',
          outline: 'none',
          border: 'none',
          borderRadius: '5px',
          width: '100px',
          height: '30px',
          fontSize: '15px',
          fontWeight: '550',
        }}
      >
        Salvar
      </button>
    </form>
  );
}
