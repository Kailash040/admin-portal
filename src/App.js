
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UpdateRecord from './UpdateRecord';
function App() {
  return (
    <div >
      
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<UpdateRecord />} />
   
      </Routes>
    </Router>
    </div>
  );
}

export default App;
