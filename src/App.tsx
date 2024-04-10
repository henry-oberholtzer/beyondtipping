import Icon from './components/Icon'
import Button from './components/Button'
import './App.css'
import Bounded from './components/Bounded'

function App() {
  return (
    <>
      <Bounded>
        <Icon/>
        <Button
        to={"X"}>
          OK
        </Button>
      </Bounded>
    </>
  )
}

export default App
