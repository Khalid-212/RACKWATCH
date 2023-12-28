import './App.css';
import { Routes, Route, json } from "react-router-dom";
import Home from './Pages/HomePage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Pagenotfound from './Pages/Pagenotfound';
function App() {
  // get the user from localstorage
  const user = localStorage.getItem('name');
  // console.log(JSON.parse(JSON.stringify(user)))

  return (
    <div className="App">
       <Routes>
        <Route path="*" element={<Pagenotfound/>} />
        <Route exact path="/" element={ user? <Dashboard/>:<Home />} />
        <Route exact path="/home" element={user? <Dashboard/>:<Home />} />
        <Route exact path="/dashboard" element={user? <Dashboard/>:<Home />} />
      </Routes>
    </div>
  );
}

export default App;
