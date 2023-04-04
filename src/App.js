import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Quiz from './components/quiz'
const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/quiz' element={<Quiz />} />
    </Routes>
  )
}
export default App