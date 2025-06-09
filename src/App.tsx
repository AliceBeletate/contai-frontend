import { useEffect, useState } from 'react';
import { LaunchForm } from './components/LaunchForm';
import { LaunchTable } from './components/LaunchTable';
import { api } from './services/api';
import { Launch } from './types/Launch';

function App() {
  const [launches, setLaunches] = useState<Launch[]>([]);

  const fetchLaunches = async () => {
    const response = await api.get<Launch[]>('/transactions');
    const sorted = response.data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setLaunches(sorted);
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#008080', textAlign: 'center' }}>ContAI - Gestão Contábil</h1>
      <LaunchForm onAdd={fetchLaunches} />
      <hr style={{ margin: '2rem 0' }} />
      <LaunchTable launches={launches} />
    </div>
  );
}

export default App;
