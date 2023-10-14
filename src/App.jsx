import './App.css'

import React, { Component } from 'react'
import NavBar from './Components/NavBar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Routes>
            <Route exact path="" element={<News category="general" country="in"/>} />
            <Route exact path="/general" element={<News key="general" category="general" country="in"/>} />
            <Route exact path="/business" element={<News key="business"category="business" country="in"/>} />
            <Route exact path="/entertainment" element={<News key="entertainment"category="entertainment" country="in"/>} />
            <Route exact path="/health" element={<News key="health"category="health" country="in"/>} />
            <Route exact path="/sports" element={<News key="sports"category="sports" country="in"/>} />
            <Route exact path="/science" element={<News key="science"category="science" country="in"/>} />
            <Route exact path="/technology" element={<News key="technology"category="technology" country="in"/>} />
          </Routes>
        </div>
      </Router>
    )
  }
}

