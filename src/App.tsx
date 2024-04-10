import Icon from './components/Icon'
import Button from './components/Button'
import './App.css'
import Bounded from './components/Bounded'
import RestaurantList from './components/RestaurantList'

function App() {
  return (
    <>
      <Bounded>
        <Icon/>
        <Button
        to={"X"}>
          OK
        </Button>
        <RestaurantList />
      </Bounded>
    </>
  )
}

export default App
