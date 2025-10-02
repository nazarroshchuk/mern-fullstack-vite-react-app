import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

import './App.css'
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {


  return (
      <Router>
          <MainNavigation />
          <main>
              <Routes>
                  <Route path="/" element={ <Users />} />
                  <Route path='/places' element={ <NewPlaces />} />
                  <Route path='/:id/places' element={ <NewPlaces />} />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </main>
      </Router>
  )
}

export default App
