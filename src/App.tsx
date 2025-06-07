import './App.css';
import { LaunchForm } from  './components/LaunchForm';
import { LaunchTable } from './components/LaunchTable';

function App() {
  return (
    <div style={{maxWidth: 800, margin: '0 auto', padding: '2rem'}}>
      <h1 style={{color: '#005b99'}}> ContAI - Gestão Contábil </h1>
      <LaunchForm/>
      <hr style={{margin: '2rem 0'}} />
      <LaunchTable/>      
    </div>
  );
}

export default App;
