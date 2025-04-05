// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './App.css'
// import NavBar from './Components/NavBar'
// import Home from './Components/Home'
// import Pastes from './Components/Pastes'
// import ViewPastes from './Components/ViewPastes'
// import { Toaster } from 'react-hot-toast'

// const router = createBrowserRouter(
//   [
//     {
//       path:"/",
//       element:
//       <div>
//         <NavBar/>
//         <Home/>
//       </div>
//     },

//     {
//       path:"/pastes",
//       element:
//       <div>
//         <NavBar/>
//         <Pastes/>
//       </div>
//     },

//     {
//       path:"/pastes/:id",
//       element:
//       <div>
//         <NavBar/>
//         <ViewPastes/>
//       </div>
//     }
//   ]
// )
// function App() {

//   return (
//     <div>
//       <RouterProvider router = {router}/>
//     </div>
//   )
// }

// export default App

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Pastes from './Components/Pastes';
import ViewPastes from './Components/ViewPastes';
import NotFound from "./Components/NotFound";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pastes" element={<Pastes />} />
        <Route path="/pastes/:id" element={<ViewPastes />} />
        {/* Optional: Catch-all route for 404s */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;

