import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Results from "./pages/Results"
import Greet from "./pages/Greet"
import { useState } from "react"

function App() {

  const [name,setName] = useState("")

  return (
    <>
      <Routes>
        <Route index element={<Home winner={{name,setName}} />} />
        <Route path="/results" element={<Results />} />
        <Route path="/greet" element={<Greet winner={{name,setName}}/>} />
      </Routes>
    </>
  )
}

export default App
