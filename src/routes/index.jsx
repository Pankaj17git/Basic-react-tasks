import { BrowserRouter, Route, Routes } from "react-router"
import Weather from "../weather/Weather"
import Timer from "../timer/Timer"
import App from "../App"
import AuthButtons from "../auth0/Auth"
import ProtectedRoute from "./ProtectedRoutes"


const Path = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthButtons />} />
          <Route path="/weather" element={<ProtectedRoute component={Weather} />} />
          <Route path="/timer" element={<ProtectedRoute component={Timer} />} />
          <Route path="/app" element={<ProtectedRoute component={App} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Path;