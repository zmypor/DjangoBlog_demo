import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppContent from './AppContent/AppContent.jsx';
function App() {
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  );
}

export default App;