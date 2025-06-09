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
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#e0f0ffd2',
        padding: '1rem 10rem',
        borderRadius: '10px',
        maxWidth: '450px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <h2 style={{ color: '#008B8B', textAlign: 'center' }}>Cadastrar Lançamento</h2>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '100px', textAlign: 'right', marginRight: '10px' }}>Data:</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          style={{ flex: 1, padding: '5px' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '100px', textAlign: 'right', marginRight: '10px' }}>Descrição:</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          style={{ flex: 1, padding: '5px' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '100px', textAlign: 'right', marginRight: '10px' }}>Valor:</label>
        <input
          type="number"
          min="0"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
          style={{ flex: 1, padding: '5px' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '100px', textAlign: 'right', marginRight: '10px' }}>Tipo:</label>
        <select
          value={type}
          onChange={e => setType(e.target.value as 'credit' | 'debit')}
          style={{ flex: 1, padding: '5px' }}
        >
          <option value="credit">Crédito</option>
          <option value="debit">Débito</option>
        </select>
      </div>

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
          width: '120px',
          height: '35px',
          fontSize: '16px',
          fontWeight: '600',
          alignSelf: 'center',
        }}
      >
        Salvar
      </button>
    </form>
  );
}
