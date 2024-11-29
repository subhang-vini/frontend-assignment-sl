import './App.css'
import Wrapper from './components/Wrapper'

const URL__API =
  'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json'

function App () {
  return <Wrapper url={URL__API} pageSize={5} />
}

export default App
