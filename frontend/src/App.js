import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/HomePage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="*" element={"Page Not Found"} />
        <Route exact path="/" element={  <Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
