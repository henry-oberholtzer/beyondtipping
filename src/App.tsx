import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Map } from './components/Map';

function App() {

  return (
    <>
      <h1>APP PAGE</h1>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
