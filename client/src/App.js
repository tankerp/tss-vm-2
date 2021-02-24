import React from "react"
//import { BrowserRouter as Router, Route } from "react-router-dom"
import { Switch, Route, useLocation } from "react-router-dom"
import Home from "./routes/Home"
import "./App.css"
import Reports from "./routes/Reports"
import Loginroute from "./routes/Loginroute"
//import Header from "./Components/Header"
import { ComponentContextProvider } from "./context/ComponentContext"
import { AuthProvider } from "./context/AuthContext"
import ComponentDetail from "./routes/ComponentDetail"
function App() {
  return (
    <ComponentContextProvider>
      <div className="App">
        {/*
        <div className="navbar_header">
          <Header></Header>
        </div>
        */}
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Loginroute}></Route>
            <Route path="/sites/:id" component={ComponentDetail} />
            <Route path="/Home" component={Home} />
            <Route path="/Reports" component={Reports} />
          </Switch>
        </AuthProvider>
      </div>
    </ComponentContextProvider>
  )
}

export default App
