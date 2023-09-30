import './App.css';
import { Routes, Route, json } from "react-router-dom";
import Home from './Pages/HomePage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  // get the user from localstorage
  const user = localStorage.getItem('user');
  console.log(JSON.parse(user))

  return (
    <div className="App">
       <Routes>
        <Route path="*" element={"Page Not Found"} />
        <Route exact path="/" element={ user? <Dashboard/>:<Home />} />
        <Route exact path="/home" element={user? <Dashboard/>:<Home />} />
        <Route exact path="/dashboard" element={user? <Dashboard/>:<Home />} />
      </Routes>
    </div>
  );
}

export default App;
