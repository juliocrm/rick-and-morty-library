import './App.css';
import Router from './routes/Router';
import { SelectionProvider } from './components/list/SelectionContext';

function App() {
  return (
    <SelectionProvider>
      <Router />
    </SelectionProvider>
  );
}

export default App
