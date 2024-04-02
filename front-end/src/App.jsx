import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Results from "./pages/Results"
import Greet from "./pages/Greet"

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/greet" element={<Greet />} />
      </Routes>
    </>
  )
}

export default App
