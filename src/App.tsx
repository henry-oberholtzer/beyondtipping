import Icon from './components/Icon'
import Button from './components/Button'
import './App.css'
import { Outlet } from 'react-router-dom'
import Bounded from './components/Bounded'
// import RestaurantList from './components/RestaurantList'

function App() {
  return (
    <>
      <Bounded>
        <Icon/>
        <Button
        to={"X"}>
          OK
        </Button>

        <Outlet />
      </Bounded>
    </>
  )
}

export default App
