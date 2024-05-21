import './App.css';
import './Login';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './Login';
import AdminUI from './AdminUI';
import UserUI from './UserUI';
import PollUI from './PollUI';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route
					path='/'
					element={<Login />}
			/>
      <Route
          path='/admin'
          element={<AdminUI />}
      />
      <Route
          path='/user'
          element={<UserUI />}
      />
      <Route 
          path="/poll/:pollId" 
          element={<PollUI />} 
      />
    </Routes>
    </BrowserRouter>
  );
    
}

export default App;
