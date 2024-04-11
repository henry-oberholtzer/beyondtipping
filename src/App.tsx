import './App.css'
import { Outlet } from 'react-router-dom'
import Bounded from './components/Bounded'
import Header from './components/Header'
import Footer from './components/Footer'
import { navigation } from './main'

function App() {
  return (
      <Bounded>
        <Header
          navigation={navigation}
          />
        <Outlet />
        <Footer
          navigation={navigation}
        />
      </Bounded>
  )
}

export default App
