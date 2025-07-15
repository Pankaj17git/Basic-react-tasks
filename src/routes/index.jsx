import { BrowserRouter, Route, Routes } from "react-router"
import Weather from "../weather/Weather"
import Timer from "../timer/Timer"
import App from "../App"

const Path = () => {
  return(
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weather/>}/>
        <Route path="/timer" element={<Timer/>}/>
        <Route path="/auth" element={<Weather/>}/>
        <Route path="/app" element={<App/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
} 
export default Path;