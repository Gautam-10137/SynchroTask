import { useDispatch } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import Navigator from './components/Navigator/Navigator';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import { ProjectProvider } from './context/ProjectContext';
import ProjectDetail from './components/Project/ProjectDetail';
function App() {
 
  return (
    <div className="App m-1">
      <BrowserRouter>
           <div>
              <Routes>
                <Route path="/" element={<div><Navigator page={"Home"}/><Home/></div>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
              </Routes>
             
            <ProjectProvider> 
              <Routes>
                <Route path="/dashboard" element={<div><Navigator page={"Dashboard"} /><Dashboard/></div>} />
                <Route path="/project/:projectId" element={<div><Navigator page={"ProjectDetail"} /><ProjectDetail /></div>}></Route>
              </Routes>
            </ProjectProvider>
         


           </div>
      
      
      
      </BrowserRouter>

    </div>
  );
}

export default App;
