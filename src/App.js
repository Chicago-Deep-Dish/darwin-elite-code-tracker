import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import RecordLibrary from './pages/RecordLibrary'
import Nav from './components/Nav'

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/records' element={<RecordLibrary />} />
      </Routes>
    </div>
  );
}
