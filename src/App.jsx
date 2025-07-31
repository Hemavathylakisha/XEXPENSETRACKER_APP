import './App.css'
import Dashboard from './components/Dashboard/Dashboard'

function App() {

  return (
    <>
    <h1 style={{textAlign:"left",fontSize:"38px"}}>Expense Tracker</h1>             
            <div className='Exp-container'>
              <Dashboard />
            </div>
    </>
  )
}

export default App
