import { useContext } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom'
import Auth from './components/Auth.js'
import Navbar from './components/Navbar.js'
import Profile from './components/Profile.js'
import Public from './components/Public/Public.js'
import { UserContext } from './context/UserProvider.js'
function App() {
  const { token, logout } = useContext(UserContext)
  return (
    <div className="App">
      <Navbar logout={logout} />
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/public" /> : <Auth />}
        />
        <Route 
          path="/profile"
          element={<Profile />}
        />
        <Route 
          path="/public"
          element={<Public />}
        />
      </Routes>
    </div>
  );
}

export default App;
