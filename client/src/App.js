import { useDispatch } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import Navigator from './components/Navigator/Navigator';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import { ProjectProvider } from './context/ProjectContext';
function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
           <div>
              <Routes>
                <Route path="/" element={<div><Navigator/><Home/></div>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
              </Routes>
             
            <ProjectProvider> 
              <Routes>
                <Route path="/dashboard" element={<div><Navigator /><Dashboard/></div>} />
              </Routes>
            </ProjectProvider>
         


           </div>
      
      
      
      </BrowserRouter>

    </div>
  );
}

export default App;
